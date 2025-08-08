// React Imports
import { useState } from "react";

// Components
import Header from "../../components/Header/Header";
import BillViewHeader from "../../components/BillViewHeader/BillViewHeader";
import UserSetup from "../../components/userQuestions/UserSetup/UserSetup";
import BillsViewer from "../../components/billsManagement/BillsViewer/BillsViewer";

// Stylesheet
import styles from './homepage.module.css';


export default function Homepage() {
    // For the question to ask the user at first
    const [showUserSetup, setShowUserSetup] = useState(true);

    return (
        <>
            {/* Also needs to check for User Auth, don't want to ask same questions again */}
            {showUserSetup ?
                <UserSetup
                    showUserSetup={showUserSetup}
                    setShowUserSetup={setShowUserSetup}
                />
                :
                <div className={styles.container}>
                    <Header userAuth={true} />
                    <BillViewHeader />
                    <div className={styles.innerContainer}>
                        <div className={styles.left}>
                            <p>Latest Bills</p>
                        </div>

                        <div className={styles.right}>
                            <p>Tracking Bills</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}