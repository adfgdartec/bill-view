// Stylesheet
import styles from './boxText.module.css';

export default function BoxText(props) {
    return (
        <div className={`${styles.container} ${props.className}}`}>
            <p className={styles.text}>{props.text}</p>
        </div>
    );
}