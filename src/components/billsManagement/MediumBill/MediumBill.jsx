// Components
import Presenter from '../billParts/Presenter/Presenter';
import Topics from '../billParts/Topics/Topics';
import Summary from '../billParts/Summary/Summary';
import BillHeader from '../billParts/BillHeader/BillHeader';

// Stylesheet
import styles from './mediumBill.module.css';



export default function MediumBill(props) {
    return (
        <div className={styles.container}>
            <BillHeader billName={props.billName} view={props.view} setView={props.setView} />

            <div className={styles.infoContainer}>
                <Presenter presenterInfo={props.presenterInfo} />
                <Topics topics={props.topics} />
            </div>
            
            <Summary summary={props.summaries.medium} isLarge={false} />
        </div>
    );
}