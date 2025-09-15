// Stylesheet
import styles from './centerFocusFeature.module.css';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Other Components

export default function CenterFocusFeature() {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className={styles.featureTextContainer}>
                <p className={styles.featureText}>This is our main feature! Thanks for Reading!</p>
            </div>
            
            <motion.div
                className={styles.featureInformationContainer}
                initial={{opacity: 0, y: 25 }}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
                viewport={{once: true, amount: 0.2}}
            >
                <p className={styles.featureInformationText}>Here we go deeper into our feature. Please continue to read until the end. Here we could talk more about this feature, maybe how it was created? Again, thank you for reading!</p>
            </motion.div>
        </motion.div>
    );
}