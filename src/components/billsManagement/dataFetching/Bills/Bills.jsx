// Styles
import styles from './bills.module.css';

// React Imports
import { useState, useEffect } from 'react';

// Components
import BillsViewer from '../../BillsViewer/BillsViewer';

// Note: This files contains TODO to get data

export default function Bills(props) {
    // Contains all the bills pulled
    // TODO: Give the user an option to pull more bill data (will figure out later)
    // eslint-disable-next-line no-unused-vars
    const [bills, setBills] = useState([]);

    // All bill Ids and filtering data about the bills
    const [allBillsFilterData, setAllBillsFilterData] = useState([]);

    useEffect(() => {
        function getAllBillsFilterData(bills) {
            return bills.map(bill => {
                return {id: bill.id, topics: bill.topics.map(topic => topic.name), subject: bill.subject};
            });
        }
        setAllBillsFilterData(getAllBillsFilterData(bills));
    }, [bills]);

    // Contains the ids and data of what bills to display
    const [displayBillIds, setDisplayBillIds] = useState([]);

    // Filtering the bills based on the user tags selected
    useEffect(() => {
        const filteredBillIds = props.tagsSelected.length === 0 ?
            allBillsFilterData.map(bill => bill.id)
        : 
            allBillsFilterData.filter(bill => bill.topics.some(topic => props.tagsSelected.includes(topic))).map(bill => bill.id);
        
        setDisplayBillIds(filteredBillIds);
    }, [props.tagsSelected, allBillsFilterData]);

    // Handles the Tracking Bill Functionality
    // TODO: Get the current TrackingBillIds from the DB
    const [trackingBillIds, setTrackingBillIds] = useState([]);

    // Handles when user clicks on the bookmark
    function addTrackingBill(event) {
        // TODO: Update Tracking Bills in DB
        const billId = parseInt(event.currentTarget.id);
        setTrackingBillIds(trackingBillIds => trackingBillIds.includes(billId) ? trackingBillIds : [...trackingBillIds, billId]);
    }

    function removeTrackingBill(event) {
        // TODO: Update Tracking Bills in DB
        const billId = parseInt(event.currentTarget.id);
        setTrackingBillIds(trackingBillIds => trackingBillIds.filter(id => id !== billId));
    }

    return (
        <div className={styles.container}>
            <BillsViewer
                data={bills.filter(bill => displayBillIds.includes(bill.id))}
                trackingBillIds={trackingBillIds}
                addTrackingBill={addTrackingBill}
                removeTrackingBill={removeTrackingBill}
            />
        </div>
    );
}