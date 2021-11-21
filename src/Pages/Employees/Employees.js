import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core'
import React, { useState } from 'react'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EmployeeForm from './EmployeeForm'
import PageHeader from '../../components/PageHeader'
import useTable from '../../components/useTable'
import * as employeeService from '../../services/employeeService'
import Controls from '../../components/controls/Controls'
import { EditOutlined, Search } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import Popup from '../../components/Popup'
import Notification from '../../components/Notification'
import ConfirmDialog from '../../components/ConfirmDialog'

const headCells = [
    {id:"fullName", label:"Full Name"},
    {id:"email", label:"Email (Personal)"},
    {id:"mobile", label:"Mobile Number"},
    {id:"department", label:"Department"},
    {id:"actions", label:"Actions", disableSorting:true}
]

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin:theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput: {
        width:"75%"
    },
    newButton: {
        position:"absolute",
        right:"10px"
    }
}))

const Employees = () => {
    
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({fn:items => {return items}})
    const [openPopup, setOpenPopup] = useState(false)
    const [ recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen:false, message:"", type:"" })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen:false, title:"", subTitle:"" })

    const classes = useStyles()

    const {TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting} = useTable(records, headCells, filterFn)

    const handleSearch = e => {
        const target = e.target
        setFilterFn({
            fn: items => {
                if(target.value == "") {
                    return items
                } else {
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if(employee.id == 0) {
            employeeService.insertEmployee(employee)
        } else {
            employeeService.updateEmployee(employee)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen:true,
            message:"Submitted Successfully",
            type:'success'
        })
    }

    const openInPopup = (item) => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        })
        employeeService.deleteEmployee(id)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen:true,
            message:"Deleted Successfully",
            type:'error'
        })
    }

    return (
        <div>
            <PageHeader 
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineIcon fontSize='large' />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input 
                        label='Search Employees'
                        className={classes.searchInput}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment:(<InputAdornment position='start'>
                                <Search />
                            </InputAdornment>)
                        }}
                    />
                    <Controls.Button
                        text='Add New'
                        variant='outlined'
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {setOpenPopup(true); setRecordForEdit(null)}}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordAfterPagingAndSorting().map(record => (
                            <TableRow key={record.id}>
                                <TableCell>{record.fullName}</TableCell>
                                <TableCell>{record.email}</TableCell>
                                <TableCell>{record.mobile}</TableCell>
                                <TableCell>{record.department}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton 
                                        color='primary'
                                        onClick={() => openInPopup(record)}
                                    >
                                        <EditOutlined fontSize='small' />
                                    </Controls.ActionButton>    
                                    <Controls.ActionButton 
                                        color='secondary'
                                        onClick={() => setConfirmDialog({
                                            isOpen:true,
                                            title:"Are you sure to delete this record?",
                                            subTitle:"You can't undo this operation",
                                            onConfirm: () => { onDelete(record.id) }
                                        })}
                                    >
                                        <CloseIcon fontSize='small'/>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Employee Form"
            >
                <EmployeeForm
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </div>
    )
}

export default Employees