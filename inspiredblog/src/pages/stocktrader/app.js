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
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Footer from './Footer';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Portfolio from './components/Portfolio';
import Market from './components/Market';
import Stock from './components/Stock';

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
    // below css is for search box:
    root: {
        flexGrow: 1,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        margin: '0 10%',
    },
    input: {
        marginLeft: '10px',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
})
const App = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const router = (                    
        <Switch>         
            <Route exact path='/stocktrader/login' component = {SignIn}></Route>
            <Route exact path='/stocktrader/signup' component = {SignUp}></Route>
            <Route exact path='/stocktrader/portfolio' component = {Portfolio}></Route>
            <Route exact path='/stocktrader/market' component = {Market}></Route>
            <Route exact path='/stocktrader/stocks/:stock_symbol' component = {Stock}></Route>
            <Route path='*' component = {Portfolio}></Route>
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
                    <Paper component="form" className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search"
                            // inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <iframe 
                        frameborder="no" border="0" marginwidth="0" marginheight="0" 
                        width='298' height='52' 
                        src="//music.163.com/outchain/player?type=2&id=532606500&auto=1&height=32">                   
                    </iframe>
                    <Button classes={{root: classes.signInButton}} onClick = {()=>history.push('/stocktrader/market')}>
                        <span className={'sansBold'}>Market</span>
                    </Button>
                    <Button classes={{root: classes.signInButton}} onClick = {()=>history.push('/stocktrader/portfolio')}>
                        <span className={'sansBold'}>Portfolio</span>
                    </Button>
                    <Button classes={{root: classes.signInButton}} onClick = {()=>history.push('/stocktrader/account')}>
                        <span className={'sansBold'}>Account</span>
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
                    <iframe 
                        frameborder="no" 
                        border="0" marginwidth="0" marginheight="0" 
                        width='330' height='86' 
                        src="//music.163.com/outchain/player?type=2&id=532606500&auto=1&height=66">    
                    </iframe>
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