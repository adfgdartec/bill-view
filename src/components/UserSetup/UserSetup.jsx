// React Imports
import { useState } from 'react';

// Stylesheet
import styles from './UserSetup.module.css';

// Components

export default function UserSetup(props) {
    
    const [questionNumber, setQuestionNumber] = useState(1);
    
    function handleClickSkip() {
        props.setShowUserSetup(false);
    }

    function handleClickNext() {
        setQuestionNumber(questionNumber + 1);
    }

    return (
        <div className={styles.container}>
            {props.showUserSetup && 
                <div>
                    <p>Thank you for joining us!</p>
                    <p>Please answer a few questions to get started.</p>

                    {questionNumber === 1 && 
                        <div>
                            <p>What topics are you interested in?</p>

                            <div>
                                <p>Topics Selected</p>
                                <p>Topics</p>
                            </div>

                            <div>
                                <p>All Topics</p>
                                <p>Topics</p>
                            </div>


                            <p onClick={handleClickSkip}>Skip</p>
                            <p onClick={handleClickNext}>Next</p>
                        </div>
                    }

                    {questionNumber === 2 && 
                        <div>
                            <p>Question</p>
                        </div>
                    }
                    
                </div>
            }
        </div>
    );
}