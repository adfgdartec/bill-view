// Components
import Logo from '../Logo/Logo';

// Stylesheet
import styles from './billViewHeader.module.css';

export default function BillViewHeader() {
    return (
        <div className={styles.container}>
            <p className={styles.text}>Welcome to <span><Logo link={false} shortLogo={false} className={styles.logo}/></span></p>
        </div>
    );
}