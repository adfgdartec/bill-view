// Stylesheet
import styles from './features.module.css';

// Components

export default function Features(props) {
    return (
        <motion.div
            className={styles.container}
        >
            <div className={styles.leftContainer}>
                <img className={styles.featureImage} src={props.imageSource} alt={props.alt} />
            </div>
            <div className={styles.rightContainer}>
                <p className={styles.featureTitle}>This is our greatest feature.</p>
                <p className={styles.featureDescription}>Here is where we can talk about something about this feature.</p>
            </div>
        </motion.div>
    );
}