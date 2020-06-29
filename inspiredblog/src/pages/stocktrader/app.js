import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthState } from './selectors/authSelector';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Footer from './Footer';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';

const useStyles = makeStyles({
    main: {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        flexWrap: 'wrap',
        position: 'relative',
        paddingBottom: '40px', // for bottom footer.
        minHeight: '100vh',
    },
    title: {
        flexGrow: 1
    },
    link: {
        paddingLeft:'20px',
        display:'flex',
        justifyContent:'flex-start',
        '&:hover': {
            color: 'rgb(0,180,5)'
        }
    },
    primary: {
        color: 'inherit',
        backgroundColor: 'inherit'
    },
    positionFixed: {
        position: 'inherit'
    },
    signInButton: {
        textTransform: 'none',
        '&:hover': {
            color: 'rgb(0,180,5)',
            backgroundColor: 'inherit'
        }
    },
    signUpButton: {
        textTransform: 'none',
        minWidth: '144px',
        padding: '0 16px',
        borderRadius: '24px',
        backgroundColor: 'rgba(0,200,5,1)',
        height: '48px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '30px',
        '&:hover': {
            backgroundColor: 'rgb(0,180,5)',
            backgroundBottomColor: '#000000',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
        }
    },
})
const App = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const router = (                    
        <Switch>         
            <Route exact path='/stocktrader/login' component = {SignIn}></Route>
            <Route exact path='/stocktrader/signup' component = {SignUp}></Route>
            <Route exact path='/stocktrader/myhome' component = {Home}></Route>
            <Route exact path='/stocktrader' component = {Home}></Route>
            <Route path='/stocktrader/*' component = {Home}></Route>
            <Route path='*' component = {Home}></Route>
        </Switch>)
    return (
        <React.Fragment>
            {checkAuthState()?
            <AppBar classes={{colorPrimary: classes.primary, positionFixed: classes.positionFixed}}>
                <Toolbar>
                    <IconButton edge="start">
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.link}>
                        Learn
                    </div>
                    <div className={`${classes.title} ${classes.link}`}>
                        Support
                    </div>
                    <Button classes={{root: classes.signInButton}} onClick = {()=>history.push('/stocktrader/login')}>
                        <span className={'sansBold'}>Sign In</span>
                    </Button>
                    <Button classes={{root: classes.signUpButton}} onClick = {()=>history.push('/stocktrader/signup')}>
                        <span className={'sansBold'}>Sign Up</span>
                    </Button>
                </Toolbar>
            </AppBar>:
            <AppBar classes={{colorPrimary: classes.primary, positionFixed: classes.positionFixed}}>
                <Toolbar>
                    <IconButton edge="start">
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.link}>
                        Learn
                    </div>
                    <div className={`${classes.title} ${classes.link}`}>
                        Support
                    </div>
                    <Button classes={{root: classes.signInButton}} onClick = {()=>history.push('/stocktrader/login')}>
                        <span className={'sansBold'}>Sign In</span>
                    </Button>
                    <Button classes={{root: classes.signUpButton}} onClick = {()=>history.push('/stocktrader/signup')}>
                        <span className={'sansBold'}>Sign Up</span>
                    </Button>
                </Toolbar>
            </AppBar>}
            <div className={classes.main}>
                {router}
                <Footer />
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onSignIn: (email,password)=> dispatch({type: 'SIGN_IN', data: {email, password}}),
        // onLogout: (history) => dispatch({type: 'logout', data: history}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);