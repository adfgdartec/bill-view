// Styles
import styles from './bills.module.css';

// React Imports
import { useState, useEffect } from 'react';

// Components
import BillsViewer from '../BillsViewer/BillsViewer';
import MoreBills from '../../moreBills/MoreBills';
// Note: This files contains TODO to get data

export default function Bills(props) {
    // Contains all the bills pulled
    // TODO: Give the user an option to pull more bill data (will figure out later)
    const [bills, setBills] = useState([]);

    // Handles giving more bills for the user to view and switching between

    const [currentBillGroup, setCurrentBillGroup] = useState(1);
    
    const [showMoreBills, setShowMoreBills] = useState(true);

    function handleNextClick() {
        setCurrentBillGroup(currentBillGroup => currentBillGroup + 1);
    }
    function handleBackClick() {
        if (currentBillGroup != 1) {
            setCurrentBillGroup(currentBillGroup => currentBillGroup - 1)
        }
    }

    useEffect(() => {
        const fetchBills = async () => {
            if (props.type === "bills") {
                // TODO: Pull all the bills from the database
                // Use the current bill group to pull segments of data Ex: Bill Group 2 = 51-100
                // If less then 50 bills, setShowMoreBills(false)
                const response = await fetch("/api/data", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
                if (!response.ok) {
                    // Handle HTTP error statuses (404, 500, etc.)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setBills(data);


                function loopAndAssignIdsForTopics(list) {
                    if (list.length == 0) {
                        // console.log("Undefined Topic");
                        return "";
                    }
                    let id_tracker = 0;
                    return list.map(item => {
                        id_tracker += 1;
                        return {id: id_tracker-1, name: item, icon: ""}
                    });
                }
                // loopAndAssignIdsForTopics(bill.committees.split("{\"").split("\"}").split("\" , \""))
                console.log(bills, "v");
                setBills(bills => bills.map(bill => {
                    return {
                        id: bill["bill_number"],
                        billName: bill["title"],
                        topic: bill["subject_area"],
                        presenterInfo: {
                            name: "", //bill["sponsers"].split("{\"").split("\"}").split("\" , \"").join(", "),
                            party: "",
                            presenterImg: ""
                        },
                        billStatistics: {
                            chanceOfPassing: bill["chance_to_pass_percent"],
                            // Change this variable naming if hindersome
                            otherStatistic: bill["house_and_senate_differences"],
                            otherStatistic1: bill["status"]
                        },
                        summaries: {
                            medium: bill["short_summary"],
                            large: bill["summary"]
                        },
                        topics: [
                            { "id": 1, "name": "Environment", "icon": "🌿" },
                            { "id": 2, "name": "Energy", "icon": "⚡" },
                            { "id": 3, "name": "Economy", "icon": "💰" }
                        ],
                        news: []
                    }
                }));
                console.log(bills, "u");

                if (bills.length > 50) {
                    setShowMoreBills(false)
                }
                // setBills(BILL_DATA)
            }
        }
        fetchBills();
    }, [props.type]);

    // All bill Ids and filtering data about the bills
    // Filtering data consists of {billid: , topics: , subject: }
    const [allBillsFilterData, setAllBillsFilterData] = useState([]);

    useEffect(() => {
        function getAllBillsFilterData(bills) {
            return bills.map(bill => {
                console.log(bill.topics);
                return {id: bill.id, billName: bill.billName, topics: bill.topics.map(topic => topic.name), subject: bill.subject};
            });
        }
        // console.log(getAllBillsFilterData(bills));
        setAllBillsFilterData(getAllBillsFilterData(bills));
    }, [bills]);

    // Contains the ids of what bills to display
    const [displayBillIds, setDisplayBillIds] = useState([]);

    // Filtering the bills based on the user tags selected
    useEffect(() => {
        const filteredBillIds = props.tagsSelected.length === 0 ?
            allBillsFilterData.map(bill => bill.id)
        : 
            allBillsFilterData.filter(bill => bill.topics.some(topic => props.tagsSelected.includes(topic))).map(bill => bill.id);
        
        setDisplayBillIds(filteredBillIds);
    }, [props.tagsSelected, allBillsFilterData]);

    // Handles the Search Bar Inputs
    useEffect(() => {
        const search = typeof props.searchInput === 'string' ? props.searchInput.trim().toLowerCase() : '';
        if (!search) {
            // if search cleared, restore from bills
            setAllBillsFilterData(bills.map(bill => ({ id: bill.id, billName: bill.billName, topics: (bill.topics || []).map(t => t.name), subject: bill.subject })));
            return;
        }
        setAllBillsFilterData(() => {
            // derive from the latest bills array to ensure topics exist
            const source = bills || [];
            return source
                .filter(bill => (bill.billName || '').toLowerCase().includes(search))
                .map(bill => ({ id: bill.id, billName: bill.billName, topics: (bill.topics || []).map(t => t.name), subject: bill.subject }));
        });
    }, [props.searchInput, bills]);

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

            {showMoreBills && <MoreBills
                handleNextClick={handleNextClick}
                handleBackClick={handleBackClick}
                currentValue={currentBillGroup}
            />}
        </div>
    );
}

// const BILL_DATA = [{
//     "id": 1,
//     "billName": "Clean Energy Advancement Act",
//     "topic": "energy",
//     "presenterInfo": {
//       "name": "Senator Alicia Grant",
//       "party": "Democratic Party",
//       "presenterImg": "https://example.com/images/alicia-grant.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 68,
//       "otherStatistic": "35 Senators in support",
//       "otherStatistic1": "Public approval: 72%"
//     },
//     "summaries": {
//       "medium": "This bill aims to increase federal investment in solar and wind energy infrastructure across the United States.",
//       "large": "The Clean Energy Advancement Act proposes a 10-year, $200 billion investment into renewable energy projects, tax incentives for companies meeting clean energy benchmarks, and the creation of a federal advisory board on sustainable infrastructure. The bill targets a 40% reduction in national carbon emissions by 2035, while also providing job training programs for displaced fossil fuel workers."
//     },
//     "topics": [
//       { "id": 1, "name": "Environment", "icon": "🌿" },
//       { "id": 2, "name": "Energy", "icon": "⚡" },
//       { "id": 3, "name": "Economy", "icon": "💰" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "Clean Energy Bill Gains Momentum in Senate",
//         "channelLogo": "https://example.com/logos/nbc-news.png",
//         "content": "The Clean Energy Advancement Act, proposed by Sen. Alicia Grant, is gaining bipartisan traction as climate issues become a key focus in the upcoming elections.",
//         "link": "https://example.com/news/clean-energy-bill-senate"
//       },
//       {
//         "id": 2,
//         "title": "Critics Say Energy Bill Overlooks Rural Communities",
//         "channelLogo": "https://example.com/logos/fox-news.png",
//         "content": "While the Clean Energy Bill promises progress, some lawmakers argue it doesn't address the infrastructure challenges faced by rural states.",
//         "link": "https://example.com/news/energy-bill-rural-impact"
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "billName": "Affordable Housing Expansion Act",
//     "topic": "housing",
//     "presenterInfo": {
//       "name": "Representative Marcus Lee",
//       "party": "Independent",
//       "presenterImg": "https://example.com/images/marcus-lee.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 54,
//       "otherStatistic": "120 Representatives in support",
//       "otherStatistic1": "Public approval: 67%"
//     },
//     "summaries": {
//       "medium": "This bill seeks to expand affordable housing options in urban and rural areas through tax credits and federal grants.",
//       "large": "The Affordable Housing Expansion Act allocates $75 billion toward construction incentives, rental subsidies, and renovation grants for low-income families. It also proposes zoning reform assistance programs for municipalities to reduce housing shortages."
//     },
//     "topics": [
//       { "id": 1, "name": "Economy", "icon": "💰" },
//       { "id": 2, "name": "Housing", "icon": "🏠" },
//       { "id": 3, "name": "Community", "icon": "🤝" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "Lawmakers Push for More Affordable Housing",
//         "channelLogo": "https://example.com/logos/cnn.png",
//         "content": "Rep. Marcus Lee’s proposal could alleviate housing shortages in major cities by boosting federal investment.",
//         "link": "https://example.com/news/affordable-housing-bill"
//       }
//     ]
//   },
//   {
//     "id": 3,
//     "billName": "Digital Privacy Protection Act",
//     "topic": "technology",
//     "presenterInfo": {
//       "name": "Senator Dana Reyes",
//       "party": "Republican Party",
//       "presenterImg": "https://example.com/images/dana-reyes.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 62,
//       "otherStatistic": "28 Senators in support",
//       "otherStatistic1": "Public approval: 81%"
//     },
//     "summaries": {
//       "medium": "This bill enforces stricter regulations on data collection by large technology companies.",
//       "large": "The Digital Privacy Protection Act requires companies to obtain explicit consent before sharing user data, mandates transparency reports, and increases penalties for data breaches. It empowers the FTC to oversee enforcement."
//     },
//     "topics": [
//       { "id": 1, "name": "Technology", "icon": "💻" },
//       { "id": 2, "name": "Privacy", "icon": "🔒" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "Senate Considers New Privacy Bill",
//         "channelLogo": "https://example.com/logos/reuters.png",
//         "content": "Lawmakers debate the balance between consumer privacy and innovation as Sen. Dana Reyes’s bill gains attention.",
//         "link": "https://example.com/news/privacy-bill-senate"
//       }
//     ]
//   },
//   {
//     "id": 4,
//     "billName": "Veterans Health Modernization Act",
//     "topic": "healthcare",
//     "presenterInfo": {
//       "name": "Senator Robert Greene",
//       "party": "Democratic Party",
//       "presenterImg": "https://example.com/images/robert-greene.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 75,
//       "otherStatistic": "44 Senators in support",
//       "otherStatistic1": "Public approval: 88%"
//     },
//     "summaries": {
//       "medium": "This act seeks to enhance healthcare technology and services for U.S. military veterans.",
//       "large": "The Veterans Health Modernization Act funds modernization of VA hospitals, telehealth expansion, and new programs for mental health and PTSD treatment. It also introduces performance accountability systems for veteran care providers."
//     },
//     "topics": [
//       { "id": 1, "name": "Healthcare", "icon": "🏥" },
//       { "id": 2, "name": "Veterans", "icon": "🎖️" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "Veterans Healthcare Bill Receives Broad Support",
//         "channelLogo": "https://example.com/logos/abc-news.png",
//         "content": "Senator Greene’s modernization bill is expected to pass with bipartisan backing.",
//         "link": "https://example.com/news/veterans-healthcare"
//       }
//     ]
//   },
//   {
//     "id": 5,
//     "billName": "National Cybersecurity Defense Act",
//     "topic": "security",
//     "presenterInfo": {
//       "name": "Representative Leah Thomas",
//       "party": "Republican Party",
//       "presenterImg": "https://example.com/images/leah-thomas.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 59,
//       "otherStatistic": "90 Representatives in support",
//       "otherStatistic1": "Public approval: 70%"
//     },
//     "summaries": {
//       "medium": "This bill strengthens national cybersecurity defenses and coordination between agencies.",
//       "large": "The National Cybersecurity Defense Act proposes a centralized cyber defense agency, updated national protocols, and investments in public-private cybersecurity partnerships to address growing digital threats."
//     },
//     "topics": [
//       { "id": 1, "name": "Security", "icon": "🛡️" },
//       { "id": 2, "name": "Technology", "icon": "💻" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "House Advances Cybersecurity Defense Bill",
//         "channelLogo": "https://example.com/logos/politico.png",
//         "content": "The cybersecurity proposal highlights national concerns over recent ransomware attacks.",
//         "link": "https://example.com/news/cybersecurity-defense"
//       }
//     ]
//   },
//   {
//     "id": 6,
//     "billName": "Education Equity and Access Act",
//     "topic": "education",
//     "presenterInfo": {
//       "name": "Senator Hannah Kim",
//       "party": "Democratic Party",
//       "presenterImg": "https://example.com/images/hannah-kim.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 70,
//       "otherStatistic": "42 Senators in support",
//       "otherStatistic1": "Public approval: 79%"
//     },
//     "summaries": {
//       "medium": "This bill ensures equal access to education and technology for underserved communities.",
//       "large": "The Education Equity and Access Act increases funding for rural schools, expands internet access, and creates new grants for low-income districts to provide digital learning resources."
//     },
//     "topics": [
//       { "id": 1, "name": "Education", "icon": "📚" },
//       { "id": 2, "name": "Equality", "icon": "⚖️" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "New Education Bill Targets Digital Divide",
//         "channelLogo": "https://example.com/logos/nyt.png",
//         "content": "Senator Kim’s bill has sparked optimism among educators seeking to close the learning gap.",
//         "link": "https://example.com/news/education-equity-bill"
//       }
//     ]
//   },
//   {
//     "id": 7,
//     "billName": "Small Business Recovery Act",
//     "topic": "economy",
//     "presenterInfo": {
//       "name": "Representative James O’Connor",
//       "party": "Republican Party",
//       "presenterImg": "https://example.com/images/james-oconnor.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 65,
//       "otherStatistic": "150 Representatives in support",
//       "otherStatistic1": "Public approval: 74%"
//     },
//     "summaries": {
//       "medium": "This bill provides financial relief and loan forgiveness for small businesses impacted by economic downturns.",
//       "large": "The Small Business Recovery Act includes emergency grants, tax deferrals, and targeted relief funds for local businesses. It encourages job retention and workforce re-entry programs."
//     },
//     "topics": [
//       { "id": 1, "name": "Economy", "icon": "💰" },
//       { "id": 2, "name": "Business", "icon": "🏢" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "Small Business Relief Bill Heads to House Vote",
//         "channelLogo": "https://example.com/logos/wsj.png",
//         "content": "Economists praise the bill’s potential to stabilize local economies amid inflation concerns.",
//         "link": "https://example.com/news/small-business-bill"
//       }
//     ]
//   },
//   {
//     "id": 8,
//     "billName": "Clean Water and Conservation Act",
//     "topic": "environment",
//     "presenterInfo": {
//       "name": "Senator Maria Lopez",
//       "party": "Democratic Party",
//       "presenterImg": "https://example.com/images/maria-lopez.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 77,
//       "otherStatistic": "47 Senators in support",
//       "otherStatistic1": "Public approval: 85%"
//     },
//     "summaries": {
//       "medium": "This act aims to protect and restore national waterways and wetlands.",
//       "large": "The Clean Water and Conservation Act provides $50 billion in federal funding for water purification projects, wetland conservation, and state-level water infrastructure improvements."
//     },
//     "topics": [
//       { "id": 1, "name": "Environment", "icon": "🌿" },
//       { "id": 2, "name": "Infrastructure", "icon": "🏗️" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "Senate Takes Up Clean Water Bill",
//         "channelLogo": "https://example.com/logos/bbc.png",
//         "content": "Environmental groups rally behind Senator Lopez’s conservation proposal.",
//         "link": "https://example.com/news/clean-water-act"
//       }
//     ]
//   },
//   {
//     "id": 9,
//     "billName": "National Healthcare Affordability Act",
//     "topic": "healthcare",
//     "presenterInfo": {
//       "name": "Representative David Patel",
//       "party": "Democratic Party",
//       "presenterImg": "https://example.com/images/david-patel.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 61,
//       "otherStatistic": "100 Representatives in support",
//       "otherStatistic1": "Public approval: 76%"
//     },
//     "summaries": {
//       "medium": "This bill lowers healthcare costs through expanded subsidies and pricing transparency.",
//       "large": "The National Healthcare Affordability Act aims to reduce insurance premiums by expanding ACA subsidies, enforcing hospital pricing disclosure, and introducing negotiation mechanisms for prescription drugs."
//     },
//     "topics": [
//       { "id": 1, "name": "Healthcare", "icon": "🏥" },
//       { "id": 2, "name": "Economy", "icon": "💰" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "New Healthcare Bill Seeks to Cut Costs Nationwide",
//         "channelLogo": "https://example.com/logos/cbs.png",
//         "content": "Rep. Patel’s bill reignites debates over government involvement in healthcare pricing.",
//         "link": "https://example.com/news/healthcare-affordability"
//       }
//     ]
//   },
//   {
//     "id": 10,
//     "billName": "AI Accountability and Safety Act",
//     "topic": "technology",
//     "presenterInfo": {
//       "name": "Senator Chloe Zhang",
//       "party": "Independent",
//       "presenterImg": "https://example.com/images/chloe-zhang.jpg"
//     },
//     "billStatistics": {
//       "chanceOfPassing": 52,
//       "otherStatistic": "23 Senators in support",
//       "otherStatistic1": "Public approval: 69%"
//     },
//     "summaries": {
//       "medium": "This act introduces federal oversight for artificial intelligence use in public and private sectors.",
//       "large": "The AI Accountability and Safety Act mandates transparency in AI algorithms, establishes ethical review boards, and requires government agencies to assess AI risks before deployment in decision-making systems."
//     },
//     "topics": [
//       { "id": 1, "name": "Technology", "icon": "🤖" },
//       { "id": 2, "name": "Ethics", "icon": "⚖️" }
//     ],
//     "news": [
//       {
//         "id": 1,
//         "title": "Lawmakers Debate AI Accountability",
//         "channelLogo": "https://example.com/logos/guardian.png",
//         "content": "Sen. Zhang’s bill is one of several efforts to regulate AI development responsibly.",
//         "link": "https://example.com/news/ai-accountability-bill"
//       }
//     ]
//   }]