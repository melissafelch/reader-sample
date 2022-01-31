import styles from './Navigation.module.scss';
import logo from '../../images/turtle.png';
import {Link} from 'react-router-dom'
import "@fontsource/atma"
import "@fontsource/yanone-kaffeesatz"

export default function Navigation() {
    return (
        <div className={styles.navWrapper}>
            <div className={styles.logo}>
                <img src={logo} alt="it's ya boi, Tommy" />
            </div>
            <div className={styles.topBar} style={{fontFamily: "Atma"}}>
                <Link to="/contents">Turtle Paradise Online Reader</Link>
            </div>
            <div className={styles.subNav} style={{fontFamily: "Yanone Kaffeesatz"}}>
                This is where I'd put navigation... if I had any!
                <a href="https://www.linkedin.com/in/melissa-felch-490623196/">(LinkedIn)</a>
            </div>
        </div>
    )
}