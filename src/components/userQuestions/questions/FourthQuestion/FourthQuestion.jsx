// Stylesheet
import styles from './fourthQuestion.module.css';

// MUI Components
import { Paper, Typography } from '@mui/material';

const options = [
  "📅 Daily",
  "📆 Weekly",
  "🕒 Monthly",
  "🔕 Only when there’s something important",
  "❌ Never"
];

export default function FourthQuestion(props) {
  

  return (
    <div className={styles.container}>
        <p className={styles.text}>How often do you want our updates?</p>
        {options.map((option) => (
            <Paper
            key={option}
            onClick={() => props.setNotificationSettings(option)}
            elevation={3}
            sx={{
                padding: 2,
                cursor: 'pointer',
                width: '350px',
                height: "15px",
                marginBottom: 2,
                backgroundColor: props.notificationSettings === option ? '#1976d2' : '#fff',
                color: props.notificationSettings === option ? '#fff' : 'inherit',
                '&:hover': {
                backgroundColor: props.notificationSettings === option ? '#1565c0' : '#f5f5f5',
                },
            }}
            >
            <Typography variant="body1">{option}</Typography>
            </Paper>
        ))}
    </div>
  );
}