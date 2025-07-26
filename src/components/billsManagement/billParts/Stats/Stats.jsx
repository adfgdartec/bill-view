// Stylesheet
import styles from './stats.module.css';

export default function Stats(props) {
    return (
        <div className={styles.container}>
            <p>Bill Statistics</p>
                                
            <p>Chance of Passing:</p>
            <p>{props.billStatistics.chanceOfPassing}</p>

            <p>Other Statistic:</p>
            <p>{props.billStatistics.otherStatistic}</p>

            <p>Other Statistic:</p>
            <p>{props.billStatistics.otherStatistic1}</p>
        </div>
    );
}