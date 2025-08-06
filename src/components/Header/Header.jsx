// Components
import Logo from "../Logo/Logo";
import Navigator from "../Navigator";
import Avatar from '@mui/material/Avatar';
import ActionButton from "../ActionButton/ActionButton";

// Stylesheet
import styles from './header.module.css';

export default function Header(props) {
    return (
        <div className={styles.header}>
            <div className={styles.leftGroup}>
                <Logo userAuth={props.userAuth} shortLogo={true} link={true}/>
                
                <Navigator location="/about-us">
                    <p className={styles.link}>About Us</p>
                </Navigator>
                
                <Navigator location="/latest">
                    <p className={styles.link}>Latest Bills</p>
                </Navigator>

                {props.userAuth && (
                    <Navigator location="/tracking">
                        <p className={styles.link}>Tracking Bills</p>
                    </Navigator>
                )}
            </div>

            <div className={styles.rightGroup}>
                {!props.userAuth ?
                    (
                        <>
                            <ActionButton location='/sign-up' content="Sign Up" />
                            <ActionButton location='/login' content='Login' />
                        </>
                    )
                    :
                        <>
                            <Navigator location="/settings">
                                <p className={styles.link}>User Name</p>
                            </Navigator>
                            <Navigator>
                                <Avatar>HG</Avatar>
                            </Navigator>
                        </>
                }
            </div>
        </div>
    );
}
