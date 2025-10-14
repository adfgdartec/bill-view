// Stylesheet
import styles from './listFeature.module.css';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Components
import BasicCard from '../BasicCard/BasicCard';

// heading
// features list

export default function ListFeature(props) {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <p className={styles.featureText}>{props.heading}</p>
            <motion.div
                className={styles.cardsContainer}
                initial={{opacity: 0, y: 25 }}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
                viewport={{once: true, amount: 0.2}}
            >
                {props.featuresList.map(feature =>
                    <BasicCard
                        heading={feature.heading}
                        body={feature.body}
                    />
                )}
            </motion.div>
        </motion.div>
    );
}