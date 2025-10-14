// React Imports
import { useState } from 'react';
import { useMemo } from 'react';

// Components
import FilteringTags from "../components/FilteringTags/FilteringTags";
import Header from "../components/Header/Header";
import Bills from "../components/billsManagement/Bills/Bills";
import MoreBills from '../components/moreBills/MoreBills';

export default function Latest() {
    // Handling all the Bill Filtering

    // All tags shown to the user
    const [tags, setTags] = useState(ALL_TAGS);

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
                searchInput={searchInput}
                type="bills"
            />
        </div>
    );
}

const ALL_TAGS = [
    {
        id: 1,
        selected: false,
        label: "Agriculture and Food"
    },
    {
        id: 2,
        selected: false,
        label: "Animals"
    },
    {
        id: 3,
        selected: false,
        label: "Armed Forces and National Security"
    },
    {
        id: 4,
        selected: false,
        label: "Arts, Culture, Religion"
    },
    {
        id: 5,
        selected: false,
        label: "Civil Rights and Liberties, Minority Issues"
    },
    {
        id: 6,
        selected: false,
        label: "Commmerce"
    },
    {
        id: 7,
        selected: false,
        label: "Crime and Law Enforcement"
    },
    {
        id: 8,
        selected: false,
        label: "Economics and Public Finance"
    },
    {
        id: 9,
        selected: false,
        label: "Education"
    },
    {
        id: 10,
        selected: false,
        label: "Emergency Management"
    },
    {
        id: 11,
        selected: false,
        label: "Energy"
    },
    {
        id: 12,
        selected: false,
        label: "Environmental Protection"
    },
    {
        id: 13,
        selected: false,
        label: "Families"
    },
    {
        id: 14,
        selected: false,
        label: "Finance and Financial Sector"
    },
    {
        id: 15,
        selected: false,
        label: "Foreign Trade and International Finance"
    },
    {
        id: 16,
        selected: false,
        label: "Geographic Areas, Entities, and Committees"
    },
    {
        id: 17,
        selected: false,
        label: "Government Operations and Politics"
    },
    {
        id: 18,
        selected: false,
        label: "Health"
    },
    {
        id: 19,
        selected: false,
        label: "Housing and Community Development"
    },
    {
        id: 20,
        selected: false,
        label: "Immigration"
    },
    {
        id: 21,
        selected: false,
        label: "International Affairs"
    },
    {
        id: 22,
        selected: false,
        label: "Labor and Employment"
    },
    {
        id: 23,
        selected: false,
        label: "Law"
    },
    {
        id: 24,
        selected: false,
        label: "Native Americans"
    },
    {
        id: 25,
        selected: false,
        label: "Private Legislation"
    },
    {
        id: 26,
        selected: false,
        label: "Public Lands and Natural Resources"
    },
    {
        id: 27,
        selected: false,
        label: "Science, Technology, and Communication"
    },
    {
        id: 28,
        selected: false,
        label: "Social Sciences and History"
    },
    {
        id: 29,
        selected: false,
        label: "Social Welfare"
    },
    {
        id: 30,
        selected: false,
        label: "Sports and Recreation"
    },
    {
        id: 31,
        selected: false,
        label: "Taxation"
    },
    {
        id: 32,
        selected: false,
        label: "Transportation and Public Works"
    },
    {
        id: 33,
        selected: false,
        label: "Water Resources Department"
    }
]