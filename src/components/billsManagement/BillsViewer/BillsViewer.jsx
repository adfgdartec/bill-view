// Stylesheet
import styles from './billView.module.css';

// Components
import Bill from '../Bill/Bill';

export default function BillsViewer(props) {
    return (
        <div className={styles.container}>
            {props.data?.map(bill =>
                    <Bill
                        key={bill.id}
                        id={bill.id}
                        bill={bill}
                        addTrackingBills={props.addTrackingBill}
                        removeTrackingBills={props.removeTrackingBill}
                        isTracked={bill.isTracked}
                    />
                )
            }
        </div>
    );
}