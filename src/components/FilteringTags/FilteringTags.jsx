// Stylesheet
import styles from './filteringTags.module.css';

// Components
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import DoneIcon from '@mui/icons-material/Done';


export default function FilteringTags(props) {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
            },
        },
    }));

    function handleClick(event) {
        props.setTags(tags => tags.map(tag => tag.id === event.target.id ? { ...tag, selected: event.target.variant } : tag));
        props.filterBills();
    }

    function handleDelete(event) {
        props.setTags(tags => tags.filter(tag => tag.id !== event.target.id));
        props.filterBills();
    }

    return (
        <div className={styles.container}>
            <p className={styles.addTagLabel}>Add Tags</p>

            <div className={styles.tags}>
                {props.tags?.map(tag => 
                    <Chip
                        key={tag.id}
                        id={tag.id}
                        label={tag.label}
                        onClick={handleClick}
                        onDelete={handleDelete}
                        deleteIcon={<DoneIcon />}
                        variant="outlined"
                        size="small"
                    />
                )}
            </div>
            
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    value={props.searchInput}
                    onChange={(e) => props.setSearchInput(e.target.value)}
                    onKeyDown={props.handleKeyDown}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </div>
    );
}