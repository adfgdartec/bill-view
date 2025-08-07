// Stylesheet
import styles from './optionCard.module.css';

// Components
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function OptionCard(props) {

    // <OptionCard
    //     option={option}
    //     isSelected={true}
    //     addOption={addOption}
    //     deleteOption={deleteOption}
    // />

    return (
        <div className={styles.container}>
            <Chip
                label={props.optionLabel}
                variant={props.selected ? "filled" : "outlined"}
                className={props.selected ? styles.tagSelected : styles.tagUnselected}
                size="medium"
                onDelete={props.selected ? () => props.deleteOption(props.option) : () => props.addOption(props.option)}
                onClick={props.selected ? () => props.deleteOption(props.option) : () => props.addOption(props.option)}
                deleteIcon={props.selected ? <RemoveIcon /> : <AddIcon />}
            />
        </div>
    )
}