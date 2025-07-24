// Components
import Button from '@mui/material/Button';
import Navigator from '../Navigator';

// Stylesheet
import styles from './actionButton.module.css';

export default function ActionButton(props) {
    return (
        <Navigator location={props.location}>
            <Button variant="contained" className={`${styles.button} ${props.className}`}>{props.content}</Button>
        </Navigator>
    );
}