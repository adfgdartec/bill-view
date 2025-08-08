// Stylesheet
import styles from './fifthQuestion.module.css';

// React Components
import { useState } from 'react';

// Components
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

export default function FifthQuestion(props) {
    
    const [summary, setSummary] = useState("Summary for the simplicity value of 50. Here is more text for content purposes. Hope you like this summary.");

    const handleChange = (event, newValue) => {
        props.setSimplicityValue(newValue); // update value live
    };

    const handleChangeCommitted = (event, newValue) => {
        // update summary only when user stops sliding
        const newSummary = `Summary for the simplicity value of ${newValue}. Here is more text for content purposes. Hope you like this summary.`;
        setSummary(newSummary);
    };

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <p className={styles.text}>
                    Which level of simplicity suits you best?
                </p>
                <Tooltip title="We use this as a reference in the future when giving you summaries." arrow>
                    <InfoOutlinedIcon fontSize="small" color="action" style={{ cursor: 'pointer' }} />
                </Tooltip>
            </div>
            
            <p className={styles.summary}>{summary}</p>
            <Box sx={{ width: 300 }}>
                <Typography gutterBottom>
                    Value: {props.simplicityValue}
                </Typography>
                <Slider
                    value={props.simplicityValue}
                    min={1}
                    max={100}
                    step={1}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    valueLabelDisplay="auto"
                    sx={{
                        color: '#1976d2',
                        height: 6,
                        '& .MuiSlider-thumb': {
                            height: 20,
                            width: 20,
                            backgroundColor: '#fff',
                            border: '2px solid currentColor',
                            '&:hover': {
                                boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                            },
                        },
                        '& .MuiSlider-track': {
                            border: 'none',
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.3,
                            backgroundColor: '#bfbfbf',
                        },
                        '& .MuiSlider-valueLabel': {
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            borderRadius: '8px',
                        },
                    }}
                />
            </Box>
        </div>
    );
}
