import { FormControl, RadioGroup as MuiRadioGroup, FormControlLabel, FormLabel, Radio } from '@material-ui/core'
import React from 'react'

export default function RadioGroup({name, value, label, onChange, items}) {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
            >
                {items.map(item => <FormControlLabel key={item.id} value={item.id} label={item.title} control={<Radio/>} />)}
            </MuiRadioGroup>
        </FormControl>
    )
}
