// Stylesheet
import styles from './moreBills.module.css';

// React Imports
import ActionButton from '../ActionButton/ActionButton';

export default function moreBills(props) {
    return (
        <div className={styles.container}>
            <ActionButton
                className={styles.button}
                content="Back"
                onClick={props.handleBackClick}
            />
            <p>{props.currentValue}</p>
            <ActionButton
                className={styles.button}
                content="Next"
                onClick={props.handleNextClick}
            />
        </div>
    );
}