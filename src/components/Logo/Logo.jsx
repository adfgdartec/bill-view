import Navigator from '../Navigator';
import styles from './logo.module.css';

export default function Logo(props) {

    if (props.link) {
        return (
            props.shortLogo ? 
                props.userAuth ?
                    <Navigator location="/homepage">
                        <p className={`${styles.logo} ${props.className}`}>BV</p>
                    </Navigator> 
                : 
                    <Navigator location="/">
                        <p className={`${styles.logo} ${props.className}`}>BV</p>
                    </Navigator>
            :
                props.userAuth ?
                    <Navigator location="/homepage">
                        <p className={`${styles.logo} ${props.className}`}>Bill View</p>
                    </Navigator> 
                : 
                    <Navigator location="/">
                        <p className={`${styles.logo} ${props.className}`}>Bill View</p>
                    </Navigator>
        );
    } else {
        return (
            props.shortLogo ?
                <p className={`${styles.logo} ${props.className}`}>BV</p>
            :
                <p className={`${styles.logo} ${props.className}`}>Bill View</p>
        );
    }
}
