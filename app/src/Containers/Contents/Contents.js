import React from "react";
import {useOutletContext} from "react-router-dom";
import {Link} from 'react-router-dom';
import ErrorPage from '../ErrorPage/ErrorPage';
import styles from './Contents.module.scss'
import "@fontsource/yanone-kaffeesatz"

export default function Contents() {
    const [seriesContents] = useOutletContext();

    const seriesList = seriesContents.seriesDescriptions;
    
    if (seriesList && seriesList.length > 0) {
        return (
            <div className={styles.contents}>{seriesList.map(item => {
                const d = new Date(item.update);
                const formattedDate = d.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"});

                return (
                    <div key={item.series} className={styles.seriesTab}>
                            <div>
                                <img height="150" alt={item.series} src={item.thumbnail} />
                            </div>
                            <div style={{fontFamily: "Yanone Kaffeesatz"}} >
                                <Link to={item.series}>
                                    <span className={styles.series}>{item.series.replaceAll("_", " ")}</span><br />
                                    by {item.author}<br />
                                    {item.status} with {item.total} {item.total === 1 ? "chapter" : "chapters"}<br />
                                    Last updated: {formattedDate}
                                </Link>
                            </div>
                    </div>
                )
            })}</div>
        )
    } else {
        return <ErrorPage />
    }
  }

  