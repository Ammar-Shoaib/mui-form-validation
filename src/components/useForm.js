import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

export default function useForm(initialValues, validationOnChange=false, validate) {

    const [values, setValues] = useState(initialValues) 
    const [error, setError] = useState({})

    const handleInputChange = (e) => {
        const {value, name} = e.target
        setValues({...values, [name]: value})

        if(validationOnChange) {
            validate({ [name]:value })
        }
    }

    const resetForm = () => {
        setValues(initialValues)
        setError({})
    }

    return {
        values, setValues, handleInputChange, resetForm, error, setError
    }
}

const useStyles = makeStyles(theme => ({
    root:{
        "& .MuiFormControl-root": {
            width:"80%",
            margin:theme.spacing(1)
        }
    }
}))

export function Form(props) {
    const classes = useStyles()
    const {children, ...other} = props
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {children}
        </form>
    )
}
