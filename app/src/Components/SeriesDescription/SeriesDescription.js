import styles from './SeriesDescription.module.scss';

export default function SeriesDescription(props) {
    const series = props.data;

    return (
    <div className={styles.dataBlock}>
        <div className={styles.seriesInformation}>
            <p>
                <span className={styles.heading}>Author</span><br />
                {series.author}
            </p>
            <p>
                <span className={styles.heading}>Status</span><br />
                {series.status}
            </p>
            <p className={styles.heading}>
                <a href={series.linkback}>Download Chapters</a><br />
                {series.forum && <a href={series.forum}>Forum Discussion</a>}
            </p>
        </div>
        <div className={styles.description}>
            <p>{series.summary}</p>
        </div>

    </div>
    )
}