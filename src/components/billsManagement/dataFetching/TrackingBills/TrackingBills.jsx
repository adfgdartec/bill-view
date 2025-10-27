// Stylesheet
import styles from './trackingBills.module.css';

// React Imports
import {useState} from React;

// Components Imports
import BillsViewer from "../BillsViewer/BillsViewer";

export default function TrackingTags(props) {
    // Contains a list of bills the user is tracking
    const [trackingBills, setTrackingBills] = useState([]);

    // This is the list of the Bill IDs from the DB
    const [trackingBillIds, setTrackingBillIds] = useState([]);

    // Filtered bills, but for bills the user is tracking list
    const [filteredTrackingBills, setFilteredTrackingBills] = useState([]);

    // This is used to filter the bills
    const selectedTags = props.selectedTags;

    // Setting filtered bills based on Tags selected
    useEffect(() => {
        if (trackingTags.length !== 0) {
            setFilteredTrackingBills(bills.filter(bill =>
                trackingTags.some(tag => tag.label === bill.topic)
            ));
        } else {
            setFilteredTrackingBills(bills);
        }
    }, [selectedTags, bills]);

    // Manages Tracking Bills
    function addTrackingBill(event) {
        const billId = parseInt(event.currentTarget.id);
        const bill = event.currentTarget.bill;
        setTrackingBillIds(trackingBillsIds => {
            return [...trackingBillsIds, billId];
        });
        setTrackingBills(trackingBills => {
            return [...trackingBills, bill];
        });
    }

    function removeTrackingBill(event) {
        const billId = parseInt(event.currentTarget.id);
        setTrackingBillIds(trackingBillIds => {
            return trackingBillIds.filter(id => id !== billId);
        });
        setTrackingBills(trackingBills => {
            return trackingBills.filter(bill => bill.id !== billId);
        });
    }

    return (
        <>
            <BillsViewer
                data={filteredTrackingBills}
                removeTrackingBill={removeTrackingBill}
                addTrackingBill={addTrackingBill}
            />
        </>
    );
}