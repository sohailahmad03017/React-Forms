import React from 'react';
import { TextField } from '@mui/material';

export default function STextField(props) {
    const {label, variant, fullWidth, required, onChange,type,size,margin,placeholder,value } = props;
  return (
    <>
            <TextField 
            fullWidth={fullWidth ?? true}
            required={required ?? true}
            label={label} 
            variant={variant ?? 'outlined'} 
            onChange={onChange}
            type={type}
            size={size ?? 'small'}
            margin={margin ?? 'none'}
            placeholder={placeholder}
            value={value}
            
            />
    </>
  )
}
