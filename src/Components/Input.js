import React from 'react'
import { TextField } from '@mui/material'

export default function Input(props) {
  return (
    <div>
<TextField 
variant='standard'
sx={{ margin:"20px"}}
fullWidth
required= {props.required}
id="outlined-required"
label={props.label}
type={props.type}
value={props.value}
onChange ={props.onChange}
/>
    </div>
  )
}
