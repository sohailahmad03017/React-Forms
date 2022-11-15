import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SSelect(props) {

    const {label, sourceArr, variant, fullWidth, size, margin, func, selectKey } = props;

  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    if(func){
      func(selectKey, event.target.value);
    }
  };

  return (
    <Box>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{margin:'-5px'}}>{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          size={size ?? 'small'}
          fullWidth = {fullWidth ?? true}
          margin = {margin ?? 'none'}
        >
         {
            sourceArr.map((item,index)=> <MenuItem key={index} value={item}>{item}</MenuItem>)
         }
          

        </Select>
      </FormControl>
    </Box>

  );
}
