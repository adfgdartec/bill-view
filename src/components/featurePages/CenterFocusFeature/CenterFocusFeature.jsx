// Stylesheet
import styles from './centerFocusFeature.module.css';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Other Components

export default function CenterFocusFeature(props) {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className={styles.featureTextContainer}>
                <p className={styles.featureText}>{props.heading}</p>
            </div>
            
            <motion.div
                className={styles.featureInformationContainer}
                initial={{opacity: 0, y: 25 }}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
                viewport={{once: true, amount: 0.2}}
            >
                <p className={styles.featureInformationText}>{props.body}</p>
            </motion.div>
        </motion.div>
    );
}