// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
            layout
            transition={{ duration: 0.5 }}
            className={styles.container}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={view} // Key is important for AnimatePresence
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                >
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
                </motion.div>
            </AnimatePresence>
            
        </motion.div>
    );
}