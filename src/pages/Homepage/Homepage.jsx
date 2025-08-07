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
    // The questions part, in editing
    const userQuestions = [
        {
            id: 1,
            question: "What topics are you interested in?",
            options: [
                { id: 1, label: "topic1" },
                { id: 2, label: "topic2" },
                { id: 3, label: "topic3" },
                { id: 4, label: "topic with a long name" }
            ]
        },
        {
            id: 2,
            question: "What subjects are you interested in?",
            options: [
                { id: 1, label: "subject1" },
                { id: 2, label: "subject2" },
                { id: 3, label: "subject3" },
                { id: 4, label: "subject with a long name" }
            ]
        }
    ];

    const [showUserSetup, setShowUserSetup] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState([]);

    return (
        <>
            {showUserSetup ?
                <UserSetup
                    showUserSetup={showUserSetup}
                    setShowUserSetup={setShowUserSetup}
                    userQuestions={userQuestions}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
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