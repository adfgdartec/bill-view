// Components
import BookmarkIcon from '@mui/icons-material/Bookmark';

// Stylesheet
import styles from './billHeader.module.css';

export default function BillHeader(props) {
    return (
        <div className={styles.container}>
            <p className={styles.name}>{props.billName}</p>
            <BookmarkIcon className={styles.bookmarkIcon}/>
        </div>
    );
}