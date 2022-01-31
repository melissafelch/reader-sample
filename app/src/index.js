import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Contents from './Containers/Contents/Contents';
import Series from './Containers/Series/Series';
import ErrorPage from './Containers/ErrorPage/ErrorPage';

import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="contents" element={<Contents />} />
        <Route path="contents/:series" element={<Series />} />
        <Route path="*" element={<ErrorPage />}
    />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);