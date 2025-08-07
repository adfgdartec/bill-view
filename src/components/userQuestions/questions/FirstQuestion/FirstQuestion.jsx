// Stylesheets
import styles from './firstQuestion.module.css';

// Components
import OptionCard from '../../questionParts/OptionCard/OptionCard';

export default function FirstQuestion(props) {

    function addOption(newOption) {
        props.setSelectedOptions(selectedOptions => [...selectedOptions, newOption]);
    }

    function deleteOption(deleteOption) {
        props.setSelectedOptions(selectedOptions => selectedOptions.filter(option => option.id !== deleteOption.id));
    }

    return (
        <>
            <div className={styles.optionsContainer}>
                <p className={styles.topicsText}>Topics Selected</p>
                <div className={styles.options}>
                    {props.selectedOptions?.map(option => (
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
                    {props.userQuestions[0].options.map(option => (
                        <OptionCard
                            key={option.id}
                            id={option.id}
                            optionLabel={option.label}
                            option={option}
                            selected={props.selectedOptions.map(selectedOption => selectedOption.id).includes(option.id)}
                            addOption={addOption}
                            deleteOption={deleteOption}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}