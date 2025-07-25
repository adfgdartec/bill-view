// Components
import { useState } from 'react';
import SmallBill from '../SmallBill/SmallBill';
import MediumBill from '../MediumBill/MediumBill';
import LargeBill from '../LargeBill/LargeBill';

// Stylesheet
import styles from './bill.module.css';


export default function Bill(props) {
    const [currentView, setCurrentView] = useState(props.currentView);

    function handleClick() {
        if (currentView < 3) {
            setCurrentView(currentView + 1);
        } else {
            setCurrentView(0);
        }
    }
    
    return (
        <div className={styles.container}>
            {currentView === 0 && <SmallBill onClick={handleClick}/>}
            {currentView === 1 && <MediumBill onClick={handleClick}/>}
            {currentView === 2 && <LargeBill  onClick={handleClick}/>}
        </div>
    );
}