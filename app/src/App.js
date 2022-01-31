import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Navigation from './Components/Navigation/Navigation'
import styles from './App.module.scss';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default function App() {

  let [seriesContents,setSeriesContents] = useState({
    seriesDescriptions: false,
    acceptedSeries: false
  });

  let errorFlag = true;

  useEffect(() => {
    async function getContents() {
      let seriesDetails = await axios.get('http://localhost:3001/series')
      .then(res => {
          if (res.status === 200 && res.data.rows.length > 0){
            errorFlag = false;
            return res.data.rows;
          } else return false;
        })
        .catch(err => {
          errorFlag = true;
          return err;
        });

        if (errorFlag) {
          setSeriesContents({error:true})
        } else {
          let acceptedSeries = seriesDetails && seriesDetails.map(description => {return description.series});
          setSeriesContents({seriesDescriptions: seriesDetails, acceptedSeries: acceptedSeries});
        }
    }
 
    getContents();
  }, []);
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <div className={styles.content}>
        <Outlet context={[seriesContents,setSeriesContents]} />
      </div>
    </div>
  );
}
