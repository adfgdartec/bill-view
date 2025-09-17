// Stylesheet
import styles from './coderCard.module.css';

export default function CoderCard(props) {
    return (
        <div className={styles.container}>
            <p className={styles.name}>{props.coderName}</p>
            <div className={styles.innerContainer}>
                <img className={styles.coderImg} src={props.coderImg} alt={`${props.coderName}'s Image`} />
                <p className={styles.details}>{props.coderDetails}</p>
            </div>
        </div>
    );
}