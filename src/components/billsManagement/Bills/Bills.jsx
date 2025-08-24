// Stylesheet
import styles from './bills.module.css';

// Other components

export default function Bills() {
    // Variables containing bill data

    // Contains all the pulled bills
    const [bills, setBills] = useState([]);

    // Contains the filtered bills (when the user chooses tags and uses the search bar)
    const [filteredBills, setFilteredBills] = useState([]);

    // Update isTracked property when trackingBills changes
    useEffect(() => {
        const trackingBillsIds = trackingBills.map(bill => bill.id);
        setBills(bills => bills.map(bill => ({
            ...bill,
            isTracked: trackingBillsIds.includes(bill.id)
        })));
    }, [trackingBills]);
    
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
                data={filteredBills}
                removeTrackingBill={removeTrackingBill}
                addTrackingBill={addTrackingBill}
            />
        </>
    );
}