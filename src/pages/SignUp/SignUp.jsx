// Components
import Header from "../../components/Header/Header";
import SignUpComponent from "../../components/SignUpComponent/SignUpComponent";

// Stylesheet
import styles from './signUp.module.css';

export default function SignUp() {
    return (
        <div>
            <Header userAuth={false} />
            <div className={styles.container}>
                <SignUpComponent />
            </div>
        </div>
    );
}