// Components
import Logo from "../Logo/Logo";
import Navigator from "../Navigator";
import Avatar from '@mui/material/Avatar';
import ActionButton from "../ActionButton/ActionButton";

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Stylesheet
import styles from './header.module.css';

export default function Header(props) {

    if (!props.fade) {
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className={styles.header}
        >
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
        </motion.div>
    );
}
