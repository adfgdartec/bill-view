// Stylesheet
import styles from './filteredBills.module.css';

// React Imports
import {useState} from React;

// Components Imports
import BillsViewer from "../BillsViewer/BillsViewer";

export default function FilteredTags(props) {
    // Contains a list of bills the user is tracking
    const [trackingBills, setTrackingBills] = useState([]);

    // Filtered bills, but for bills the user is tracking list
    const [filteredTrackingBills, setFilteredTrackingBills] = useState([]);

    // A list of dictionaries (tags) that have the selected property to true
    // Changes everytime trackingTags changes
    const trackingTags = useMemo(
        () => tags.filter(tag => tag.selected),
        [tags]
    );

    // Filter bills when props.filter or bills change
    useEffect(() => {
        if (trackingTags.length !== 0) {
            setFilteredBills(bills.filter(bill =>
                trackingTags.some(tag => tag.label === bill.topic)
            ));
            setFilteredTrackingBills(trackingBills.filter(bill =>
                trackingTags.some(tag => tag.label === bill.topic)
            ));
        } else {
            setFilteredBills(bills);
            setFilteredTrackingBills(trackingBills);
        }
    }, [trackingTags, bills, trackingBills]);

    // Manages Tracking Bills
    function addTrackingBill(event) {
        const billId = parseInt(event.currentTarget.id);
        setTrackingBills(trackingBills => {
            if (trackingBills.some(bill => bill.id === billId)) return trackingBills;
            let billToAdd = {...bills.find(bill => bill.id === billId), isTracked: true};
            return billToAdd ? [...trackingBills, billToAdd] : trackingBills;
        });
    }

    function removeTrackingBill(event) {
        const billId = parseInt(event.currentTarget.id);
        setTrackingBills(trackingBills => trackingBills.filter(bill => bill.id !== billId));
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