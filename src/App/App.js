import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import React from 'react'
import SideMenu from '../components/SideMenu'
import Employees from '../Pages/Employees/Employees'
import Header from '../components/Header'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3c44b126",
      main: "#333996"
    },
    secondary: {
      light:"#f8324526",
      main:"#f83245"
    },
    background: {
      default:"#f4f5fd"
    }
  },
  shape: {
    boderRadius:"12px",
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform:"translateZ(0)"
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple:true
    }
  }
})

const useStyles = makeStyles(theme => ({
  mainApp: {
    paddingLeft:"320px",
    width:"100%"
  }
}))

const App = () => {

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <SideMenu/>     
      <div className={classes.mainApp}>
        <Header/>
        <Employees />
      </div>
      <CssBaseline/>
    </ThemeProvider>
  )
}

export default App
