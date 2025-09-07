// Stylesheet
import styles from './features.module.css';

// Components

export default function Features(props) {
    return (
        <div className={styles.container}>
            <img src={props.imageSource} alt={props.alt} />
            <div>
                
            </div>
        </div>
    );
}