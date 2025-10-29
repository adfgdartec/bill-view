// Stylesheet
import styles from './filteringTags.module.css';

// Components
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// Other React Imports
import { useState } from 'react';

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

export default function FilteringTags(props) {
    const [showAllTags, setShowAllTags] = useState(false);

    function handleClick(event) {
        const tagId = parseInt(event.currentTarget.id);
        props.setTags(tags => tags.map(tag => tag.id === tagId ? { ...tag, selected: !tag.selected } : tag));
    }

    function handleShowTagsClick() {
        setShowAllTags(showAllTags => !showAllTags);
    }

    return (
        <div className={styles.container}>
            <p className={styles.addTagLabel} onClick={handleShowTagsClick}>All Tags</p>

            <div className={`${styles.tags} ${showAllTags && styles.showAllTags}`}>
                { console.log(props.tags) }
                {props.tags?.map(tag => {
                    return (
                        <div
                            key={tag.id}
                            id={tag.id}
                            onClick={handleClick}
                        >
                            <Chip
                                label={tag.label}
                                variant={tag.selected ? "filled" : "outlined"}
                                className={tag.selected ? styles.tagSelected : styles.tagUnselected}
                                size="small"
                            />
                        </div>
                    );
                }
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