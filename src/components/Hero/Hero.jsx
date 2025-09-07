// Components
import ActionButton from '../ActionButton/ActionButton';
import Logo from '../Logo/Logo';
import RotatingText from '../reactBitsComponents/RotatingText/RotatingText.jsx';
import FloatingPapers from '../animationComponents/FloatingPapers/FloatingPapers.jsx';

// Stylesheet
import styles from './hero.module.css';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
    const rotatingText = ["Experience", "Clarity", "Impact", "Community"];

    return (
        <div>
            <motion.div 
                className={styles.hero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
            >
                <FloatingPapers count={18} />
                <div className={styles.centerDiv}>
                    <p className={styles.centerText}>The Best Designed</p>
                    <motion.div className={styles.innerCenterDiv}>
                        <motion.p
                            className={`${styles.animatedGradient} ${styles.importantText}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            Bill-Viewing
                        </motion.p>

                        <RotatingText
                            texts={rotatingText}
                            mainClassName={`px-2 sm:px-2 md:px-3 
                                            bg-clip-text text-transparent 
                                            ${styles.rotatingText}
                                            overflow-hidden py-0.5 sm:py-1 md:py-2 
                                            justify-center rounded-lg`}
                            staggerFrom="last"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-20%", opacity: 0 }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            rotationInterval={3000}
                        />
                    </motion.div>

                    <div className={styles.actionButtons}>
                        <ActionButton location="/login" content="Login" className={styles.actionButton}/>
                        <ActionButton location="/sign-up" content="Sign Up" className={styles.actionButton}/>
                    </div>
                </div>
            </motion.div>
            {/* Features section planning to add in the future */}
            {/* <motion.div
                className={styles.features}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }} 
            >
                <p className={styles.text}>
                    Bill-Viewing Centered for Teens
                </p>
            </motion.div> */}
        </div>
    );
}
