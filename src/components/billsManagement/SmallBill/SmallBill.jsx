// Components
import BillHeader from '../billParts/BillHeader/BillHeader';
import Topics from '../billParts/Topics/Topics';

// Stylesheet
import styles from './smallBill.module.css';

export default function SmallBill(props) {
    return (
        <div className={styles.container}>
            <BillHeader billName={props.billName} view={props.view} setView={props.setView} />
            <Topics topics={props.topics} variant="horizontal"/>
        </div>
    );
}