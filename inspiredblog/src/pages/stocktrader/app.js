import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthState } from './selectors/authSelector';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    main: {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        flexWrap: 'wrap'
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
    header: {
        width: '100%',
        backgroundColor:'rgba(195,245,60,1)',
    },
    headerContainer: {
        margin: '0 auto',
        maxWidth: '1024px',
        padding: '100px 60px',
        width: '100%',
    },
    header_left: {
        maxWidth: '45%',
    },
    header_left_top: {
        fontSize: '60px',
        lineHeight: '72px',
        letterSpacing: '-2.4px',
        color: 'rgb(4,13,20)',
        marginBottom: '18px',
        whiteSpace: 'pre-line'
    },
    header_left_mid: {
        marginTop: '24px',
        fontSize: '24px',
        lineHeight: '32px',
        letterSpacing: '-0.24px',
        color: '#040d14',
    },
    header_left_button: {
        marginTop: '40px',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'start'
    }
})
const App = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            {checkAuthState()?
            <div className={classes.main}>
                Authenticated
            </div>:
            <div className={classes.main}>
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
                        <Button classes={{root: classes.signInButton}}>
                            <span className={'sansBold'}>Sign In</span>
						</Button>
                        <Button classes={{root: classes.signUpButton}}>
                            <span className={'sansBold'}>Sign Up</span>
						</Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.header}>
                    <div className={classes.headerContainer}>
                        <div className={classes.header_left}>
                            <div className={classes.header_left_top}>Investing for Everyone</div>
                            <div className={classes.header_left_mid}>Reacthood, a pioneer of commission-free investing, gives you more ways to make your money work harder.</div>
                            <div className={classes.header_left_button}>
                                <Button classes={{root: classes.signUpButton}} style={{marginLeft: '0', backgroundColor: '#000000', color: 'white'}}>
                                    <span className={'sansBold'}>Sign Up</span>
						        </Button>
                            </div>
                        </div>
                        <div className={classes.header_right}>

                        </div>
                    </div>
                </div>
            </div>
            }
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
        onSignIn: (email,password)=> dispatch({type: 'SIGN_IN', data: {email, password}}),
        onLogout: (history) => dispatch({type: 'logout', data: history}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);