// React Imports
import { useState, useEffect } from 'react';
import { useMemo } from 'react';

// Components
import FilteringTags from "../components/FilteringTags/FilteringTags";
import Header from "../components/Header/Header";
import BillsViewer from "../components/billsManagement/BillsViewer/BillsViewer";
import Bill from "../components/billsManagement/Bill/Bill";

export default function Latest() {
    // All tags shown to the user
    const [tags, setTags] = useState([]);

    // TODO: Somehow include search bar as a filtering thing
    const [searchInput, setSearchInput] = useState('');

    // Handles when the user enters enter in the search bar
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            console.log("User has pressed entered.");
        }
    }

    // Variables containing bill data

    // Contains all the pulled bills
    const [bills, setBills] = useState([]);

    // Contains a list of bills the user is tracking
    const [trackingBills, setTrackingBills] = useState([]);

    // Contains the filtered bills (when the user chooses tags and uses the search bar)
    const [filteredBills, setFilteredBills] = useState([]);

    // Filtered bills, but for bills the user is tracking list
    const [filteredTrackingBills, setFilteredTrackingBills] = useState([]);

    // A list of dictionaries (tags) that have the selected property to true
    // Changes everytime trackingTags changes
    const trackingTags = useMemo(
        () => tags.filter(tag => tag.selected),
        [tags]
    );

    // Update isTracked property when trackingBills changes
    useEffect(() => {
        const trackingBillsIds = trackingBills.map(bill => bill.id);
        setBills(bills => bills.map(bill => ({
            ...bill,
            isTracked: trackingBillsIds.includes(bill.id)
        })));
    }, [trackingBills]);

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
        <div>
            <Header userAuth={false} />
            
            <FilteringTags 
                tags={tags}
                setTags={setTags}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleKeyDown={handleKeyDown}
            />

            <p>You are in the Latest page.</p>
            
            <BillsViewer
                data={filteredBills}
                removeTrackingBill={removeTrackingBill}
                addTrackingBill={addTrackingBill}
            />
            <BillsViewer
                data={filteredTrackingBills}
                removeTrackingBill={removeTrackingBill}
                addTrackingBill={addTrackingBill}
            />
        </div>
    );
}
