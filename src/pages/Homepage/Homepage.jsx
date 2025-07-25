// Components
import Header from "../../components/Header/Header";
import BillViewHeader from "../../components/BillViewHeader/BillViewHeader";

// Stylesheet
import styles from './homepage.module.css';

export default function Homepage() {
    return (
        <div>
            <Header userAuth={true} />
            <BillViewHeader />
            <div className={styles.container}>
                <div className={styles.left}>
                    {/* <LatestBills /> */}
                </div>

                <div className={styles.right}>
                    {/* <TrackingBills /> */}
                </div>
            </div>
        </div>
    );
}