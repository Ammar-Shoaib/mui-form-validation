import { withStyles } from '@material-ui/core'
import React from 'react'

const style = {
    sideMenu: {
        width:"320px",
        display:"flex",
        flexDirection:"column",
        position:"absolute",
        left:"0px",
        height:"100%",
        background:"#253053"
    }
}

const SideMenu = (props) => {
    const {classes} = props
    return (
        <div className={classes.sideMenu}></div>
    )
}

export default withStyles(style)(SideMenu)