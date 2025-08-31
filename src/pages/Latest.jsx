// React Imports
import { useState } from 'react';
import { useMemo } from 'react';

// Components
import FilteringTags from "../components/FilteringTags/FilteringTags";
import Header from "../components/Header/Header";
import BillsViewer from "../components/billsManagement/BillsViewer/BillsViewer";
import Bill from "../components/billsManagement/Bill/Bill";
import Bills from "../components/billsManagement/Bills/Bills";

export default function Latest() {
    // Handling all the Bill Filtering

    // All tags shown to the user
    const [tags, setTags] = useState([
        {
            id: 1,
            selected: false,
            label: "text"
        },
        {
            id: 2,
            selected: false,
            label: "extended text"
        },
        {
            id: 3,
            selected: false,
            label: "extended text"
        },
        {
            id: 4,
            selected: false,
            label: "extended text"
        }
    ]);

    // TODO: Somehow include search bar as a filtering thing
    const [searchInput, setSearchInput] = useState('');

    // Handles when the user enters enter in the search bar
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            console.log("User has pressed entered.");
        }
    }

    // A list of dictionaries (tags) that have the selected property to true
    // Changes everytime trackingTags changes
    const trackingTags = useMemo(
        () => tags.filter(tag => tag.selected),
        [tags]
    );

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

            <Bills
                tagsSelected={trackingTags}
                type="bills"
            />
        </div>
    );
}
