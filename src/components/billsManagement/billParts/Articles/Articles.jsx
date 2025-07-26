// Stylesheet
import styles from './articles.module.css';

export default function Article(props) {
    return (
        <div className={styles.container}>
            <p>News Articles:</p>
            <div>
                {props.news.map(data => 
                    <a href={data.link} key={data.id} className={styles.link}>
                        <div className={styles.article}>
                            <div className={styles.header}>
                                <img src={data.channelLogo}/>
                                <p>{data.title}</p>
                            </div>
                            
                            <p>{data.content}</p>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}