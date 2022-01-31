import {useOutletContext} from 'react-router-dom';
import '@fontsource/yanone-kaffeesatz'

export default function PageNotFound () {
    const [seriesContents] = useOutletContext();
    let errorTitle = "Page not found!";
    let errorMessage = "Please head back to the main page and try again.";

    if (seriesContents.error === true) {
        errorTitle = "The API is down!";
        errorMessage = "oh, the humanity!";
    }
    return(<div style={{
        fontFamily: "Yanone Kaffeesatz",
        textAlign: 'center'}}>
                <h1 style={{paddingBottom: "1em"}}>{errorTitle}</h1>
                <div>{errorMessage}</div>
        </div>);
}