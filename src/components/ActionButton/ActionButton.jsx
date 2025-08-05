// Components
import Button from '@mui/material/Button';
import Navigator from '../Navigator';

// Stylesheet
import styles from './actionButton.module.css';

export default function ActionButton(props) {
    return (
        <>
            {props.location ? 
                <Navigator location={props.location}>
                    <Button
                        variant="contained"
                        className={`${styles.button} ${props.className}`}
                    >
                        {props.content}
                    </Button>
                </Navigator>
                :
                <Button
                    variant="contained"
                    onClick={props.onClick}
                    className={`${styles.button} ${props.className}`}
                >
                    {props.content}
                </Button>
            }
        </>
    );
}