import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function SizeSelector(props) {
  function handleChange(event) {
    props.setView(event.target.value);
  }

  return (
    <Box sx={{ width: 'fit-content', height: 'fit-content' }}>
        <FormControl sx={{ minWidth: 80 }} size="small">
            <InputLabel id="size-selector-label" sx={{ fontSize: '0.75rem' }}>
            View
            </InputLabel>
            <Select
                labelId="size-selector-label"
                id="size-selector"
                value={props.view}
                label="View"
                onChange={handleChange}
                sx={{
                    fontSize: '0.75rem',     // font inside select
                    padding: '2px 6px',      // adjust padding
                    height: '32px',          // shorter height
                    minWidth: 80
                }}
            >
                <MenuItem value="small" sx={{ fontSize: '0.75rem' }}>Small</MenuItem>
                <MenuItem value="medium" sx={{ fontSize: '0.75rem' }}>Medium</MenuItem>
                <MenuItem value="large" sx={{ fontSize: '0.75rem' }}>Large</MenuItem>
            </Select>
        </FormControl>
    </Box>
  );
}