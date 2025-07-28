// React Imports
import { useState } from "react";

// Components
import FilteringTags from "../components/FilteringTags/FilteringTags";
import Header from "../components/Header/Header";
import BillsViewer from "../components/billsManagement/BillsViewer/BillsViewer";

export default function Latest() {
    const [filteredBills, setFilteredBills] = useState();
    const [tags, setTags] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    function filterBills() {
        // Filter Bills Logic (Uncomplete)
        setFilteredBills(filterBills => {
            return filterBills;
        })
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            console.log("User has pressed entered.");
            filterBills();
        }
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
                filterBills={filterBills}
            />

            <p>You are in the Latest page.</p>
            
            <BillsViewer data={filteredBills} />
        </div>
    );
}