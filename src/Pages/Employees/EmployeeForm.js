import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import useForm, { Form } from '../../components/useForm'
import * as employeeService from "../../services/employeeService";
import Controls from '../../components/controls/Controls'

const items = [
    {id:"male", title:"Male"},
    {id:"female", title:"Female"},
    {id:"other", title:"Other"}
]

const initialValues = {
    id:0,
    fullName:"",
    email:"",
    mobile:"",
    city:"",
    gender:"male",
    departmentId:"",
    hireDate: new Date(),
    isPermanent:false
}

const EmployeeForm = (props) => {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = {...error}
        if('fullName' in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "Name is Required"
        if('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid"
        if('mobile' in fieldValues)
        temp.mobile = fieldValues.mobile.length > 9 ? "" : "Number should be atleast of length 10"
        if('departmentId' in fieldValues)
        temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required"
        setError({
            ...temp
        })

        if(fieldValues === values)
        return Object.values(temp).every(x => x == "")
    }

    const {values, setValues, handleInputChange, resetForm, error, setError} = useForm(initialValues, true, validate)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate())
            addOrEdit(values, resetForm)
    }

    useEffect(() => {
        if(recordForEdit != null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="fullName"
                            value={values.fullName}
                            onChange={handleInputChange}
                            label="Full Name"
                            error={error.fullName}
                        />
                        <Controls.Input
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            label="Email"
                            error={error.email}
                        />
                        <Controls.Input
                            name="mobile"
                            value={values.mobile}
                            onChange={handleInputChange}
                            label="Mobile Number"
                            error={error.mobile}
                        />
                        <Controls.Input
                            name="city"
                            value={values.city}
                            onChange={handleInputChange}
                            label="City"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.RadioGroup
                            name="gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            label="Gender"
                            items={items}
                        />
                        <Controls.Select
                            name="departmentId"
                            value={values.departmentId}
                            onChange={handleInputChange}
                            label="Department"
                            options={employeeService.getDepartmentCollection()}
                            error={error.departmentId}
                        />
                        <Controls.DatePicker
                            name="hireDate"
                            value={values.hireDate}
                            onChange={handleInputChange}
                            label="Hire Date"
                        />
                        <Controls.Checkbox
                            name="isPermanent"
                            value={values.isPermanent}
                            onChange={handleInputChange}
                            label="Is Permanent"
                        />
                        <div>
                            <Controls.Button
                                text="Submit"
                                type='submit'
                            />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}

export default EmployeeForm