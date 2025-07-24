import Navigator from '../Navigator';
import styles from './logo.module.css';

export default function Logo(props) {
    return (
        props.shortLogo ? 
            props.userAuth ?
                <Navigator location="/homepage">
                    <p className={styles.logo}>BV</p>
                </Navigator> 
            : 
                <Navigator location="/">
                    <p className={styles.logo}>BV</p>
                </Navigator>
        :
            props.userAuth ?
                <Navigator location="/homepage">
                    <p className={styles.logo}>Bill View</p>
                </Navigator> 
            : 
                <Navigator location="/">
                    <p className={styles.logo}>Bill View</p>
                </Navigator>
    );
}