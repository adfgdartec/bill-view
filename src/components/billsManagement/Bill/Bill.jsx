// Components
import { useState } from 'react';
import SmallBill from '../SmallBill/SmallBill';
import MediumBill from '../MediumBill/MediumBill';
import LargeBill from '../LargeBill/LargeBill';

// Stylesheet
import styles from './bill.module.css';


export default function Bill(props) {
    const [view, setView] = useState("small");
    
    return (
        <div className={styles.container}>
            {view === "small" && 
                <SmallBill
                    id={props.id}
                    addTrackingBills={props.addTrackingBills}
                    removeTrackingBills={props.removeTrackingBills}
                    isTracked={props.bill.isTracked}

                    view={view}
                    setView={setView}
                    billName={props.bill.billName}
                    presenterInfo={props.bill.presenterInfo}
                    billStatistics={props.bill.billStatistics}
                    summaries={props.bill.summaries}
                    topics={props.bill.topics}
                    news={props.bill.news}
                />
            }
            {view === "medium" &&
                <MediumBill
                    id={props.id}
                    addTrackingBills={props.addTrackingBills}
                    removeTrackingBills={props.removeTrackingBills}
                    isTracked={props.bill.isTracked}

                    view={view}
                    setView={setView}
                    
                    billName={props.bill.billName}
                    presenterInfo={props.bill.presenterInfo}
                    billStatistics={props.bill.billStatistics}
                    summaries={props.bill.summaries}
                    topics={props.bill.topics}
                    news={props.bill.news}
                />
            }
            {view === "large" && 
                <LargeBill
                    id={props.id}
                    addTrackingBills={props.addTrackingBills}
                    removeTrackingBills={props.removeTrackingBills}
                    isTracked={props.bill.isTracked}

                    view={view}
                    setView={setView}

                    billName={props.bill.billName}
                    presenterInfo={props.bill.presenterInfo}
                    billStatistics={props.bill.billStatistics}
                    summaries={props.bill.summaries}
                    topics={props.bill.topics}
                    news={props.bill.news}
                />
            }
        </div>
    );
}