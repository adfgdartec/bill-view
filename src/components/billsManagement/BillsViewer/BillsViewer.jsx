// Stylesheet
import styles from './billView.module.css';

// Components
import Bill from '../Bill/Bill';

export default function BillsViewer(props) {
    return (
        <div className={styles.container}>
            {props.data?.map(bill => <Bill bill={bill} />)}
        </div>
    );
}