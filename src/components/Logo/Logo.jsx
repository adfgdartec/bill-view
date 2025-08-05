import Navigator from '../Navigator';
import styles from './logo.module.css';

export default function Logo(props) {

    if (props.link) {
        return (
            props.shortLogo ? 
                props.userAuth ?
                    <Navigator location="/homepage">
                        <div className={`${styles.shortLogo} ${props.className}`}>
                            <p className={styles.b}>B</p>
                            <p className={styles.v}>V</p>
                        </div>
                    </Navigator> 
                : 
                    <Navigator location="/">
                        <div className={`${styles.shortLogo} ${props.className}`}>
                            <p className={styles.b}>B</p>
                            <p className={styles.v}>V</p>
                        </div>
                    </Navigator>
            :
                props.userAuth ?
                    <Navigator location="/homepage">
                        <div className={`${styles.logo} ${props.className}`}>
                            <p>Bill</p>
                            <p>View</p>
                        </div>
                    </Navigator> 
                : 
                    <Navigator location="/">
                        <div className={`${styles.logo} ${props.className}`}>
                            <p className={styles.bill}>Bill</p>
                            <p className={styles.view}>View</p>
                        </div>
                    </Navigator>
        );
    } else {
        return (
            props.shortLogo ?
                <div className={`${styles.shortLogo} ${props.className}`}>
                    <p>BV</p>
                </div>
            :
                <div className={`${styles.logo} ${props.className}`}>
                    <p className={styles.bill}>Bill</p>
                    <p className={styles.view}>View</p>
                </div>
        );
    }
}
