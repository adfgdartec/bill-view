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

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            console.log("User has pressed entered.");
        }
    }

    const [bills, setBills] = useState([{
        id: 1,
        billName: "Clean Energy Advancement Act",
        topic: "energy",
        presenterInfo: {
            name: "Senator Alicia Grant",
            party: "Democratic Party",
            presenterImg: "https://example.com/images/alicia-grant.jpg"
        },
        billStatistics: {
            chanceOfPassing: 68,
            otherStatistic: "35 Senators in support",
            otherStatistic1: "Public approval: 72%"
        },
        summaries: {
            medium: "This bill aims to increase federal investment in solar and wind energy infrastructure across the United States.",
            large: "The Clean Energy Advancement Act proposes a 10-year, $200 billion investment into renewable energy projects, tax incentives for companies meeting clean energy benchmarks, and the creation of a federal advisory board on sustainable infrastructure. The bill targets a 40% reduction in national carbon emissions by 2035, while also providing job training programs for displaced fossil fuel workers."
        },
        topics: [
            {
                id: 1,
                name: "Environment",
                icon: "🌿"
            },
            {
                id: 2,
                name: "Energy",
                icon: "⚡"
            },
            {
                id: 3,
                name: "Economy",
                icon: "💰"
            }
        ],
        news: [
            {
                id: 1,
                title: "Clean Energy Bill Gains Momentum in Senate",
                channelLogo: "https://example.com/logos/nbc-news.png",
                content: "The Clean Energy Advancement Act, proposed by Sen. Alicia Grant, is gaining bipartisan traction as climate issues become a key focus in the upcoming elections.",
                link: "https://example.com/news/clean-energy-bill-senate"
            },
            {
                id: 2,
                title: "Critics Say Energy Bill Overlooks Rural Communities",
                channelLogo: "https://example.com/logos/fox-news.png",
                content: "While the Clean Energy Bill promises progress, some lawmakers argue it doesn't address the infrastructure challenges faced by rural states.",
                link: "https://example.com/news/energy-bill-rural-impact"
            }
        ]
    }
    ]);
    const [trackingBills, setTrackingBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [filteredTrackingBills, setFilteredTrackingBills] = useState([]);
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
