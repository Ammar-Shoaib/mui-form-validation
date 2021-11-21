import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react' //61

const useStyles = makeStyles(theme => ({
    root:{
        background:"white",
    },
    searchbar: {
        padding:`0 ${theme.spacing(1)}`,
        fontSize:"0.8rem",
        opacity:"0.6",
        "&:hover": {
            background:"#f2f2f2"
        },
        "& .MuiSvgIcon-root": {
            marginRight:theme.spacing(1)
        }
    },
    badgeBtn: {
        "& .MuiBadge-badge": {
            background:"black"
        }
    }
}))

const Header = () => {
    const classes = useStyles()
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <InputBase 
                            className={classes.searchbar}
                            placeholder="Search..."
                            startAdornment={<SearchIcon fontSize="small" />}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} className={classes.badgeBtn} color="primary">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <ChatBubbleOutlineIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <Badge color="secondary">
                                <ExitToAppIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
