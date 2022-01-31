import { useParams, useOutletContext } from "react-router-dom";
import styles from './Series.module.scss';
import "@fontsource/yanone-kaffeesatz"
import {useEffect,useState} from 'react';
import axios from 'axios';
import SeriesDescription from '../../Components/SeriesDescription/SeriesDescription'
import ChapterContents from "../../Components/ChapterContents/ChapterContents";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function Contents() {
  const [seriesContents] = useOutletContext();
  let params = useParams();

  const [seriesData, setSeries] = useState({description: false, chapters: false});
  
  const validated = seriesContents.acceptedSeries.length > 0 && seriesContents.acceptedSeries.includes(params.series);

  useEffect (() => {
    let currentSeries;

    async function getDirectory() {
      let seriesDetails = await axios.get('http://localhost:3001/series/' + params.series)
      .then(res => {
          if (res.status === 200 && res.data.chapterList.length > 0){
            return res.data.chapterList;
          } else return false;
        });
        if (seriesDetails) {
          currentSeries = seriesContents.seriesDescriptions.find(el => el.series === params.series);
          setSeries({description: currentSeries, chapters: seriesDetails});
        }
    }
    validated && getDirectory();
  },[seriesContents, params.series, validated])

  if (validated && seriesData.description) {
    return (
      <div>
        <h1 style={{fontFamily: "Yanone Kaffeesatz"}}>{seriesData.description.series.replaceAll("_", " ")}</h1>
        <div style={{display:"flex", flex: 1, margin: "0 20px"}}>
          <div style={{flex: 2}}>
            <div>
              {
                //this is admittedly gonna look funky. But I'm not about to dangerouslysethtml. Not today, chaps!
              }
              <SeriesDescription data={seriesData.description} />
            </div>
            <ChapterContents chapters={seriesData.chapters} />
          </div>
          <div style={{flex:1}} className={styles.cover}><img alt={params.series} src={seriesData.description.cover} /></div>
        </div>
      </div>
    );  
  }
  return (
    <ErrorPage />
  )
}
  