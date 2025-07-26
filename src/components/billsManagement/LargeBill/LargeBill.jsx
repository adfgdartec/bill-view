// Components
import Article from '../billParts/Articles/Articles';
import Presenter from '../billParts/Presenter/Presenter';
import Topics from '../billParts/Topics/Topics';
import Summary from '../billParts/Summary/Summary';
import BillHeader from '../billParts/BillHeader/BillHeader';
import Stats from '../billParts/Stats/Stats';

// Stylesheet
import styles from './largeBill.module.css';

// Information Arrangement

// const props = {
//     billName: "BillName",
//     presenterInfo: {
//         name: "Presenter Name",
//         party: "party support",
//         presenterImg: "src"
//     },
//     billStatistics: {
//         chanceOfPassing: 30,
//         otherStatistic: "Statistic",
//         otherStatistic1: "Statistic"
//     },
//     summaries: {
//         medium: "medium summary",
//         large: "large summary"
//     },
//     topics: [
//         {
//             id: 1,
//             name: "topic1",
//             icon: "icon"
//         },
//         {
//             id: 2,
//             name: "topic2",
//             icon: "icon"
//         }
//     ],
//     news: [
//         {
//             id: 1,
//             title: "title",
//             channelLogo: "logo_src",
//             link: "href",
//             content: "short content"
//         }
//     ]
// }

export default function LargeBill(props) {
    return (
        <div className={styles.container} onClick={() => props.onClick()}>
            <BillHeader billName={props.billName} view={props.view} setView={props.setView} />

            <div className={styles.infoContainer}>
                <div className={styles.presenterInfo}>
                    <Presenter presenterInfo={props.presenterInfo} />
                </div>
                
                <div className={styles.infoSegment}>
                    <Stats billStatistics={props.billStatistics} />
                    <Topics topics={props.topics} variant="horizontal"/>
                </div>

                <div className={styles.infoSummary}>
                    <Summary summary={props.summaries.large} isLarge={true}/>
                </div>
            </div>

            <Article news={props.news}/>
        </div>
    );
}