// Components
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SizeSelector from '../SizeSelector/SizeSelector';

// Stylesheet
import styles from './billHeader.module.css';

export default function BillHeader(props) {
    return (
        <div className={styles.container}>
            <p className={styles.name}>{props.billName}</p>
            <div className={styles.icons}>
                <div
                    id={props.id}
                    onClick={props.isTracked ? (event) => props.removeTrackingBills(event) : (event) => props.addTrackingBills(event)}
                >
                    <BookmarkIcon
                        className={`${styles.bookmarkIcon} ${props.isTracked ? styles.isTracked : styles.isNotTracked}`}
                    />
                </div>
                
                <SizeSelector setView={props.setView} view={props.view} />
            </div>
        </div>
    );
}