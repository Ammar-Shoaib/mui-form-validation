import { TextField } from '@material-ui/core'
import React from 'react'

export default function Input({value, label, error=null, onChange, name, ...other}) {
    return (
        <TextField
            {...(error && {error:true, helperText:error})}
            variant="outlined"
            value={value}
            label={label}
            onChange={onChange}
            name={name}
            {...other}
        />
    )
}
