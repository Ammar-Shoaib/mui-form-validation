import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'
import React from 'react'

export default function Select({value, name, onChange, error=null, label, options}) {
    return (
        <FormControl 
            variant="outlined"
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                {...(error && {error:true})}
                name={name}
                value={value}
                label={label}
                onChange={onChange}
            >
                <MenuItem value=''>None</MenuItem>
                {options.map(option => <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem> )}
                {error && <FormHelperText>error</FormHelperText>}
            </MuiSelect>
        </FormControl>
    )
}
