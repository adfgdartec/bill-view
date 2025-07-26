// Components
import Header from "../../components/Header/Header";
import BillViewHeader from "../../components/BillViewHeader/BillViewHeader";
import Bill from "../../components/billsManagement/Bill/Bill";

// Stylesheet
import styles from './homepage.module.css';

export default function Homepage() {
    return (
        <div>
            <Header userAuth={true} />
            <BillViewHeader />
            <div className={styles.container}>
                <div className={styles.left}>
                    <p>Latest Bills</p>
                    { <LatestBills /> }
                </div>

                <div className={styles.right}>
                    <p>Tracking Bills</p>
                    { <TrackingBills /> }
                </div>
            </div>
        </div>
    );
}