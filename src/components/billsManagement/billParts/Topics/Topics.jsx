// Components
import Avatar from '@mui/material/Avatar';

// Stylesheet
import styles from './topics.module.css';

export default function Topics(props) {
    return (
        <div className={styles.container}>
            <p>Topics Covered</p>
            <div className={`${styles.topics} ${styles[props.variant]}`}>
                {props.topics.map(topic => 
                    <div key={topic.id} className={styles.topic}> 
                        <Avatar variant="rounded" sx={{ width: 20, height: 20, padding: 1 }}>
                            {topic.icon}
                        </Avatar>
                        <p>{topic.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
}