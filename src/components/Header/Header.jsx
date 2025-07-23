import Logo from "../Logo/Logo";
import Button from '@mui/material/Button';
import Navigator from "../Navigator";

import styles from './header.module.css';


export default function Header(props) {
    return (
        <div className={styles.header}>
            <Navigator location="/homepage"><Logo shortLogo={true} /></Navigator>
            <Navigator location="/about-us"><p className={styles.aboutUs}>About Us</p></Navigator>
            <Navigator location="/latest"><p className={styles.latestBills}>Latest Bills</p></Navigator>
            
            {/* User Auth */}
            {props.userAuth && <Navigator location="/settings"><p className={styles.userProfile}>User Profile</p></Navigator>}
            {props.userAuth && <Navigator location="/tracking"><p className={styles.trackingBills}>Tracking Bills</p></Navigator>}

            {/* Without User Auth */}
            {!props.userAuth && <Navigator location="/sign-up"><Button variant="contained" className={styles.signUp}>Sign Up</Button></Navigator>}
            {!props.userAuth && <Navigator location="/login"><Button variant="contained" className={styles.login}>Login</Button></Navigator>}
        </div>
    );
}