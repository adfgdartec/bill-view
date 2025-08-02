// React Imports
import { useState } from "react";

// Components
import Header from "../../components/Header/Header";
import BillViewHeader from "../../components/BillViewHeader/BillViewHeader";
import UserSetup from "../../components/UserSetup/UserSetup";
import BillsViewer from "../../components/billsManagement/BillsViewer/BillsViewer";

// Stylesheet
import styles from './homepage.module.css';


export default function Homepage() {
    // The questions part, in editing 
    const [showUserSetup, setShowUserSetup] = useState(false);

    return (
        <div>
            <UserSetup showUserSetup={showUserSetup} setShowUserSetup={setShowUserSetup} />
            <Header userAuth={true} />
            <BillViewHeader />
            <div className={styles.container}>
                <div className={styles.left}>
                    <p>Latest Bills</p>
                    <BillsViewer type='bills'/>
                </div>

                <div className={styles.right}>
                    <p>Tracking Bills</p>
                    <BillsViewer type='trackingBills' />
                </div>
            </div>
        </div>
    );
}