// Stylesheet
import styles from './listFeature.module.css';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Components
import BasicCard from '../BasicCard/BasicCard';

export default function ListFeature() {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <p className={styles.featureText}>This is our List of Features! Behold this Text!</p>
            <motion.div
                className={styles.cardsContainer}
                initial={{opacity: 0, y: 25 }}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
                viewport={{once: true, amount: 0.2}}
            >
                <BasicCard />
                <BasicCard />
                <BasicCard />
            </motion.div>
        </motion.div>
    );
}