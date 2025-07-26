// Stylesheet
import styles from './presenter.module.css';

export default function Presenter(props) {
    return (
        <div className={styles.container}>
            <img src={props.presenterInfo.presenterImg} alt="Presenter Image" width="200px" />
            <p>{props.presenterInfo.name}</p>
            <p>{props.presenterInfo.party}</p>
        </div>
    );
}