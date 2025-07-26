// Stylesheet
import styles from './articles.module.css';

export default function Article(props) {
    return (
        <div className={styles.container}>
            <p>News Articles:</p>
            <div>
                {props.news.map(data => 
                    <a href={data.link} key={data.id}>
                        <div className={styles.article}>
                            <p>{data.channelLogo} {data.title}</p>
                            <p>{data.content}</p>
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
}