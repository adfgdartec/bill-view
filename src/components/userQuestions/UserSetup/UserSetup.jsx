// React Imports
import { useState } from 'react';

// Stylesheet
import styles from './UserSetup.module.css';

// Components
import ActionButton from '../../ActionButton/ActionButton';
import FirstQuestion from '../questions/FirstQuestion/FirstQuestion';
import SecondQuestion from '../questions/SecondQuestion/SecondQuestion';

export default function UserSetup(props) {
    
    const [questionIndex, setQuestionIndex] = useState(0);
    


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
                    <div className={styles.topContainer}>

                        <div className={styles.header}>
                            <p className={styles.thanksText}>Thank you for joining us!</p>
                            <p className={styles.answerFewQuestionsText}>Please answer a few questions to get started.</p>
                        </div>

                        {console.log(questionIndex)}
                        {console.log(props.userQuestions[questionIndex])}
                        <p className={styles.question}>{props.userQuestions[questionIndex].question}</p>

                        <div className={styles.questionContainer}>
                            {questionIndex === 0 &&
                                <FirstQuestion
                                    selectedOptions={props.selectedOptions}
                                    setSelectedOptions={props.setSelectedOptions}
                                    userQuestions={props.userQuestions}
                                />
                            }
                            {questionIndex === 1 &&
                                <SecondQuestion
                                    // Add stuff here
                                />
                            }
                        </div>
                                         
                    </div>

                    <div className={styles.bottomContainer}>
                        <div className={styles.actionButtons}>
                            <ActionButton
                                content={questionIndex === 0 ? "Skip" : "Previous"}
                                onClick={questionIndex === 0 ? handleClickSkip : handleClickPrevious}
                            />

                            <ActionButton
                                content={questionIndex === (props.userQuestions.length - 1) ? "Submit" : "Next"}
                                onClick={questionIndex === (props.userQuestions.length - 1) ? handleClickSubmit : handleClickNext}
                            />
                        </div>
                    </div>
                </div>
            } 
        </>
    );
}