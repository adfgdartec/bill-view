import styles from './logo.module.css';

export default function Logo(props) {
    return (
        <div className={styles[props.className]}>
            {props.shortLogo ? <p>BV</p> : <p>Bill View</p>}
        </div>
    );
}