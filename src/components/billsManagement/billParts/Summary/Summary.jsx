// Stylesheet
import styles from './summary.module.css';

export default function Summary(props) {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{props.isLarge && "Extended"} AI Summary:</p>
            <p>{props.summary}</p>
        </div>
    );
}