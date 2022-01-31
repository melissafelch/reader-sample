var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var fs = require('fs');
var ini = require('ini');
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

var app = express();
var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
const dbInfo = config.database;
const siteInfo = config.site;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var conn = mysql.createConnection({
  host: dbInfo.hostname,
  user: dbInfo.user,
  password: dbInfo.password,
  database: dbInfo.database
});

// Series directory!
app.get('/series', (req,res) => {
  const query = 'SELECT * FROM series ORDER BY series ASC';

  result = conn.query(query, function (err, result) {
    if (err) return res.send({status: "error", msg: error});
    result.forEach((entry) => {
      entry.thumbnail = siteInfo.basedir + siteInfo.thumbdir + entry.series + ".jpg";
      entry.cover = siteInfo.basedir + siteInfo.coverdir + entry.series + ".jpg";
    });
    return res.send({status: "OK", rows: result});
  })
});

// tables of contents for each series
app.get('/series/:seriesName', (req, res) => {
  const query = 'SELECT * FROM series WHERE series = "' + req.params.seriesName + '"';
  seriesDescription = conn.query(query, function (err,result) {
    if (err) return res.send({status: "error", msg: err});
    if (result.length > 0) {
      contentsQuery = 'SELECT * FROM contents WHERE series = "' + req.params.seriesName + '" ORDER BY ID ASC';
      seriesContents = conn.query(contentsQuery, function (err,chapters) {
        if (err) return res.send({status: "error", msg: err});
        if (chapters.length > 0) {
          return res.send({status: "OK", series: result[0], chapterList: chapters});
        } else {
          return res.send({status: "error", msg: "no entries found"});
        }
      })
    } else {
      return res.send({status: "error", msg: "no entries found"});
    }
  })
});

// the gross part where we get the contents of each chapter!
app.get('/series/:seriesName/:chapter', (req,res) => {
  const filePath = config.site.basedir + config.site.imgdir + req.params.seriesName + '/c' + req.params.chapter;
  let pages = [];
  let success = false;

  //and this is where I found out my host doesn't allow node
  //My Disappointment Is Immeasurable And My Day Is Ruined
  axios.get(filePath).then(
    function(res) {
      const dom = new JSDOM(res.data);
      const regex = '^.*\.(jpg|JPG|gif|GIF|png|PNG)$';
      dom.window.document.querySelectorAll('a').forEach(function (filename) {
        const fileURL = filename.href;
        if (fileURL.match(regex)) 
          pages.push(filePath + "/"+fileURL);
      });
      success = true;
    }
  ).catch(
    function(error) {
      return res.send({status: "error", msg: "no entries found"});
    }
  ).then(function() {
    return res.send({status: "OK", pages: pages});
  })
  
});

app.get('/', (req,res) => {
  return res.send({error:400, message: 'invalid request'});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
