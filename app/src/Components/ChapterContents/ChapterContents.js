import '@fontsource/yanone-kaffeesatz';
import styles from './ChapterContents.module.scss'

export default function ChapterContents(props) {
    return (<table className={styles.chapterList} style={{width: "100%", fontFamily: "Yanone Kaffeesatz", }}>
        <thead>
            <tr style={{textTransform:"uppercase"}}>
                <th style={{textAlign:"right"}}>#</th>
                <th style={{textAlign: "center"}}>Chapter Title</th>
                <th style={{textAlign:"right"}}>Added</th>
            </tr>
        </thead>
        <tbody>
            {props.chapters.length > 0 && props.chapters.map(el => {
                const d = new Date(el.added);
                const formattedDate = d.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"});

                return <tr key={el.number}>
                    <td style={{textAlign: "right"}}>{el.number}</td>
                    {
                        //still not using dangerous html! 
                    }
                    <td width="75%">{el.title}</td>
                    <td style={{textAlign: "right"}}>{formattedDate}</td>
                </tr>
            })}
        </tbody>
    </table>);
}