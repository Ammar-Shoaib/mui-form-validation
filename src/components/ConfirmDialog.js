import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import Controls from './controls/Controls'
import React from 'react'
import { NotListedLocation } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    dialog: {
        position:'absolute',
        top:theme.spacing(5),
        padding:theme.spacing(2)
    },
    dialogContent: {
        textAlign:'center'
    },
    dialogTitle: {
        textAlign:'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        background:theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            background:theme.palette.secondary.light,
            cursor:'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize:'8rem'
        }
    }
}))

const ConfirmDialog = (props) => {
    const { confirmDialog, setConfirmDialog } = props
    const classes = useStyles()
    return (
        <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocation />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant='h6'>{confirmDialog.title}</Typography>
                <Typography variant='subtitle2'>{confirmDialog.subTitle}</Typography>
            </DialogContent>
            <DialogActions className={classes.dialogContent}>
                <Controls.Button
                    text='No'
                    color='default'
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen:false })}
                />
                <Controls.Button
                    text='Yes'
                    color='secondary'
                    onClick={confirmDialog.onConfirm}
                />
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
