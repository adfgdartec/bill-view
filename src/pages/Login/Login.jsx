// Components
import Header from "../../components/Header/Header";
import LoginComponent from "../../components/LoginComponent/LoginComponent";

// Stylesheet
import styles from './login.module.css';

// import Login from "../components/Login/Login";

export default function Login() {
    return (
        <div>
            <Header userAuth={false} />
            <div className={styles.container}>
                <LoginComponent />
            </div>
        </div>
    );
}