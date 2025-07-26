// Components
import { useState } from 'react';
import SmallBill from '../SmallBill/SmallBill';
import MediumBill from '../MediumBill/MediumBill';
import LargeBill from '../LargeBill/LargeBill';

// Stylesheet
import styles from './bill.module.css';


export default function Bill(props) {
    const [currentView, setCurrentView] = useState(props.currentView);

    function decrease() {
        setCurrentView(currentView - 1);
    }

    function increase() {
        setCurrentView(currentView + 1);
    }
    
    return (
        <div className={styles.container}>
            {currentView === 0 && <SmallBill decrease={decrease} />}
            {currentView === 1 && <MediumBill decrease={decrease} increase={increase} />}
            {currentView === 2 && <LargeBill  increase={increase} />}
        </div>
    );
}