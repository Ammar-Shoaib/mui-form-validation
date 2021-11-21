import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'

export default function DatePicker({name, value, label, onChange}) {

    const convertToDefaultEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar
                name={name}
                value={value}
                onChange={date => onChange(convertToDefaultEventPara(name, date))}
                label={label}
                variant="inline"
                inputVariant="outlined"
                format="dd/MMM/yyyy"
            />
        </MuiPickersUtilsProvider>
    )
}
