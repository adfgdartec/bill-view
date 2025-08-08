// Stylesheets
import styles from './thirdQuestion.module.css';

// Components
import OptionCard from '../../questionParts/OptionCard/OptionCard';

export default function ThirdQuestion(props) {

    function addOption(newOption) {
        props.setSelectedTopics(selectedTopics => [...selectedTopics, newOption]);
    }

    function deleteOption(deleteOption) {
        props.setSelectedTopics(selectedTopics => selectedTopics.filter(option => option.id !== deleteOption.id));
    }

    return (
        <div className={styles.container}>
            <p className={styles.text}>What topics are you interested in?</p>
            <div className={styles.optionsContainer}>
                <p className={styles.topicsText}>Topics Selected</p>
                <div className={styles.options}>
                    {props.selectedTopics?.map(option => (
                        <OptionCard
                            key={option.id}
                            id={option.id}
                            optionLabel={option.label}
                            option={option}
                            selected={true}
                            addOption={addOption}
                            deleteOption={deleteOption}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.optionsContainer}>
                <p className={styles.topicsText}>All Topics</p>
                <div className={styles.options}>
                    {props.topics.map(option => (
                        <OptionCard
                            key={option.id}
                            id={option.id}
                            optionLabel={option.label}
                            option={option}
                            selected={props.selectedTopics?.some(selected => selected.id === option.id) || false}
                            addOption={addOption}
                            deleteOption={deleteOption}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}