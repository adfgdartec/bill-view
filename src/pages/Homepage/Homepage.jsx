// Components
import Header from "../../components/Header/Header";
import BillViewHeader from "../../components/BillViewHeader/BillViewHeader";
import MediumBill from "../../components/billsManagement/MediumBill/MediumBill";
import SmallBill from '../../components/billsManagement/SmallBill/SmallBill';
import LargeBill from "../../components/billsManagement/LargeBill/LargeBill";

// Stylesheet
import styles from './homepage.module.css';

// Testing Data
// const data = 
// {
//     billName: "Clean Energy Advancement Act",
//     presenterInfo: {
//         name: "Senator Alicia Grant",
//         party: "Democratic Party",
//         presenterImg: "https://example.com/images/alicia-grant.jpg"
//     },
//     billStatistics: {
//         chanceOfPassing: 68,
//         otherStatistic: "35 Senators in support",
//         otherStatistic1: "Public approval: 72%"
//     },
//     summaries: {
//         medium: "This bill aims to increase federal investment in solar and wind energy infrastructure across the United States.",
//         large: "The Clean Energy Advancement Act proposes a 10-year, $200 billion investment into renewable energy projects, tax incentives for companies meeting clean energy benchmarks, and the creation of a federal advisory board on sustainable infrastructure. The bill targets a 40% reduction in national carbon emissions by 2035, while also providing job training programs for displaced fossil fuel workers."
//     },
//     topics: [
//         {
//             id: 1,
//             name: "Environment",
//             icon: "🌿"
//         },
//         {
//             id: 2,
//             name: "Energy",
//             icon: "⚡"
//         },
//         {
//             id: 3,
//             name: "Economy",
//             icon: "💰"
//         }
//     ],
//     news: [
//         {
//             id: 1,
//             title: "Clean Energy Bill Gains Momentum in Senate",
//             channelLogo: "https://example.com/logos/nbc-news.png",
//             content: "The Clean Energy Advancement Act, proposed by Sen. Alicia Grant, is gaining bipartisan traction as climate issues become a key focus in the upcoming elections.",
//             link: "https://example.com/news/clean-energy-bill-senate"
//         },
//         {
//             id: 2,
//             title: "Critics Say Energy Bill Overlooks Rural Communities",
//             channelLogo: "https://example.com/logos/fox-news.png",
//             content: "While the Clean Energy Bill promises progress, some lawmakers argue it doesn't address the infrastructure challenges faced by rural states.",
//             link: "https://example.com/news/energy-bill-rural-impact"
//         }
//     ]
// };



export default function Homepage() {
    return (
        <div>
            <Header userAuth={true} />
            <BillViewHeader />
            <div className={styles.container}>
                <div className={styles.left}>
                    <p>Latest Bills</p>
                    {/* <LatestBills /> */}
                </div>

                <div className={styles.right}>
                    <p>Tracking Bills</p>
                    {/* <TrackingBills /> */}
                </div>
            </div>
        </div>
    );
}