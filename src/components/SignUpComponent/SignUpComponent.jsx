// Components
import Logo from '../Logo/Logo';
import TextField from '@mui/material/TextField';
import Navigator from "../../components/Navigator";
import ActionButton from "../../components/ActionButton/ActionButton";

// Stylesheet
import styles from './signUpComponent.module.css';


export default function SignUpComponent() {
    return (
        <div className={styles.signUp}>
            <p className={styles.title}>Welcome to</p>
            <Logo shortLogo={false} link={false} className={styles.logo}/>

            <TextField
                className={styles.textField}
                label="Enter your username"
                type="username"
                size="small"
                variant="outlined"
            />

            <TextField
                className={styles.textField}
                label="Enter your password"
                type="password"
                size="small"
                variant="outlined"
                sx={{
                    marginBottom: "20px"
                }}
            />

            <ActionButton
                className={styles.actionButton}
                content="Sign Up"
                location="/homepage"
            />

            <p className={styles.marginTop}>
                Have an Account?
                <Navigator location="/sign-up">
                    <span className={styles.loginHere}> Login here.</span>
                </Navigator>
            </p>

            <p className={styles.marginTop}>-------- or ---------</p>

            <div className={styles.marginTop}>
                <p>Sign Up with google.</p>
            </div>
        </div>
    );
}