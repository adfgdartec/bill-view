// React Imports
import { useState } from 'react';

// Other Imports
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// Stylesheet
import styles from './UserSetup.module.css';

// Components
import ActionButton from '../../ActionButton/ActionButton';

// Components (Questions)
import FirstQuestion from '../questions/FirstQuestion/FirstQuestion';
import SecondQuestion from '../questions/SecondQuestion/SecondQuestion';
import ThirdQuestion from '../questions/ThirdQuestion/ThirdQuestion';
import FourthQuestion from '../questions/FourthQuestion/FourthQuestion';
import FifthQuestion from '../questions/fifthQuestion/fifthQuestion';

const topics = [
    { id: 1, label: "topic1" },
    { id: 2, label: "topic2" },
    { id: 3, label: "topic3" },
    { id: 4, label: "topic with a long name" }
];

export default function UserSetup(props) {
    
    // Tracks the current question index
    const [questionIndex, setQuestionIndex] = useState(0);

    // All Question Answer Data

    // Question 1
    const [stateCode, setStateCode] = useState("");

    // Question 2
    const [selectedAge, setSelectedAge] = useState('');

    // Question 3
    const [selectedTopics, setSelectedTopics] = useState([]);

    // Question 4
    const [notificationSettings, setNotificationSettings] = useState(null);

    // Question 5
    const [simplicityValue, setSimplicityValue] = useState(50);
    
    // All the functions to handle the user moving through the questions
    function handleClickSkip() {
        props.setShowUserSetup(false);
    }

    function handleClickSubmit() {
        // TODO: Store all user data before this
        props.setShowUserSetup(false);
    }

    function handleClickNext() {
        setQuestionIndex(questionNumber => questionNumber + 1);
    }

    function handleClickPrevious() {
        setQuestionIndex(questionNumber => questionNumber - 1);
    }

    return (
        <>
            {
                props.showUserSetup &&
                <div className={styles.container}>
                    <motion.div layout transition={{ duration: .75 }} className={styles.navigater}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={questionIndex} // Key is important for AnimatePresence
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={styles.topContainer}>

                                    {questionIndex === 0 &&
                                        <div className={styles.header}>
                                            <p className={styles.thanksText}>Thank you for joining us!</p>
                                            <p className={styles.answerFewQuestionsText}>Please answer a few questions to get started.</p>
                                        </div>
                                    }
                                        
                                    {questionIndex === 0 &&
                                        <FirstQuestion
                                            stateCode={stateCode}
                                            setStateCode={setStateCode}
                                        />
                                    }

                                    {questionIndex === 1 &&
                                        <SecondQuestion
                                            selectedAge={selectedAge}
                                            setSelectedAge={setSelectedAge}
                                        />
                                    }

                                    {questionIndex === 2 &&
                                        <ThirdQuestion
                                            selectedTopics={selectedTopics}
                                            setSelectedTopics={setSelectedTopics}
                                            topics={topics}
                                        />
                                    }

                                    {questionIndex === 3 &&
                                        <FourthQuestion
                                            notificationSettings={notificationSettings}
                                            setNotificationSettings={setNotificationSettings}
                                        />
                                    }

                                    {questionIndex === 4 &&
                                        <FifthQuestion
                                            simplicityValue={simplicityValue}
                                            setSimplicityValue={setSimplicityValue}
                                        />
                                    }
                                                    
                                </div>

                                <div className={styles.bottomContainer}>
                                    <div className={styles.actionButtons}>
                                        <ActionButton
                                            content={questionIndex === 0 ? "Skip" : "Previous"}
                                            onClick={questionIndex === 0 ? handleClickSkip : handleClickPrevious}
                                        />

                                        <ActionButton
                                            content={questionIndex === 4 ? "Submit" : "Next"}
                                            onClick={questionIndex === 4 ? handleClickSubmit : handleClickNext}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            } 
        </>
    );
}