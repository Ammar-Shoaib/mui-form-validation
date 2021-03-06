import { Card, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root:{
        background:"#"
    },
    pageHeader: {
        padding:theme.spacing(4),
        marginBottom:theme.spacing(2),
        display:"flex"
    },
    pageIcon: {
        padding:theme.spacing(2),
        display:"inline-block",
        color:"#3c44b1"
    },
    pageTitle: {
        marginLeft:theme.spacing(2),
        "& .MuiTypography-subtitle2": {
            opacity:"0.6"
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles()
    const {title, subTitle, icon} = props
    
    return (
        <Paper elevation={0} className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography variant='h6' component='div'>{title}</Typography>
                    <Typography variant='subtitle2' component='div'>{subTitle}</Typography>
                </div>
            </div>
        </Paper>
    )
}
