// Components
import ActionButton from '../ActionButton/ActionButton';
import Logo from '../Logo/Logo';

// Stylesheet
import styles from './hero.module.css';

export default function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.centerLogo}>
                <Logo className={styles.heroContent} shortLogo={false} link={false}/>
            </div>
            <div className={styles.actionButtons}>
                <ActionButton location="/login" content="Login" />
                <ActionButton location="/sign-up" content="Sign Up" />
            </div>
        </div>
    );
}