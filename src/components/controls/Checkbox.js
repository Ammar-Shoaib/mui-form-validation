import { FormControlLabel, Checkbox as MuiChekcbox } from '@material-ui/core'
import React from 'react'

export default function Checkbox({value, name, onChange, label}) {

    const convertToDefaultEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControlLabel
            control={
                <MuiChekcbox
                    name={name}
                    checked={value}
                    onChange={e => onChange(convertToDefaultEventPara(name, e.target.checked))}
                    color="primary"
                />
            }
            label={label}
        />
    )
}
