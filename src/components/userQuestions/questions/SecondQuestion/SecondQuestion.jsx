// Stylesheet
import styles from './secondQuestion.module.css';

// Components
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Chip, Box } from '@mui/material';

// Constants
const ageRanges = [
  { label: 'Under 18', emoji: '🎓' },  // school / learning
  { label: '18–24',   emoji: '🌱' },  // growth / starting out
  { label: '25–34',   emoji: '🚀' },  // launching career / ambitions
  { label: '35–44',   emoji: '⚖️' },  // balance / stability
  { label: '45–54',   emoji: '🏆' },  // achievements / leadership
  { label: '55–64',   emoji: '🛠️' },  // skills / craftsmanship
  { label: '65+',     emoji: '🌅' }   // golden years / sunset
];

export default function SecondQuestion(props) {
  
  const handleChipClick = (range) => {
    props.setSelectedAge(range === props.selectedAge ? null : range); // toggle off if clicked again
  };

  return (
    <div className={styles.container}>
        <p className={styles.text}>Please Select your Age Range</p>
        
        <p className={styles.emoji}>{props.selectedAge ? props.selectedAge.emoji : "⏳"}</p>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: "300px"}}>
            {ageRanges.map((range) => (
                <Chip
                    key={range.label}
                    label={range.label}
                    clickable
                    onClick={() => handleChipClick(range)}
                    color={props.selectedAge === range ? 'primary' : 'default'}
                    variant={props.selectedAge === range ? 'filled' : 'outlined'}
                />
            ))}
        </Box>
    </div>
  );
}