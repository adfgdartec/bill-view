// Components
import ActionButton from '../ActionButton/ActionButton';
import Logo from '../Logo/Logo';
import RotatingText from '../reactBitsComponents/RotatingText/RotatingText.jsx';

// Stylesheet
import styles from './hero.module.css';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
    return (
        <motion.div 
            className={styles.hero}
            initial={{ opacity: 0 }} // start transparent + red
            animate={{ opacity: 1 }} // fade in + change to blue
            transition={{ duration: 3}} // loop
        >
            {/* <div className={styles.centerLogo}>
                <Logo className={styles.heroContent} shortLogo={false} link={false}/>
            </div>
            <div className={styles.actionButtons}>
                <ActionButton location="/login" content="Login" />
                <ActionButton location="/sign-up" content="Sign Up" />
            </div> */}
            <div className={styles.centerDiv}>
                <p className={styles.centerText}>The Best Designed</p>
                <motion.div className={styles.innerCenterDiv}>
                    {/* Bill-Viewing (smoothly changes when rotating text updates) */}
                    <motion.p
                        // key={currentTextIndex} // this comes from the same state driving RotatingText
                        className={`${styles.animatedGradient} ${styles.importantText}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        Bill-Viewing
                    </motion.p>

                    {/* Rotating text WITH animated gradient */}
                    <RotatingText
                        texts={["Experience", "Clarity", "Impact", "Community"]}
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
            </div>
        </motion.div>
    );
}
