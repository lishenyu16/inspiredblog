
import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthState } from '../selectors/authSelector';
import Button from '@material-ui/core/Button';
import mrnaStockImage from '../img/mrna.png';
import Chart from 'chart.js';

const useStyles = makeStyles({
    main: {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        flexWrap: 'wrap',
        position: 'relative',
        paddingBottom: '40px', // for bottom footer.
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
    header_desc: {
        margin: '0 auto',
        maxWidth: '1024px',
        padding: '30px 60px 20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'gray'
    },
    headerContainer: {
        margin: '0 auto',
        maxWidth: '1024px',
        padding: '10px 60px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
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
    },
    header_right: {
        maxWidth: '45%',
    },

})

const Portfolio = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <div className={classes.header}>
                <div className={classes.header_desc}>
                    This is an app that helps users practice trading stocks online with real-time datas from iex cloud. Each registered user will be given 10,000 virtual bucks to trade
                    stocks. When you think you are ready to surf the real market, then gratulations!
                </div>
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
                        <img src={mrnaStockImage} style={{maxWidth: '100%'}}></img>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <img  
                    src="https://cdn.robinhood.com/assets/robinhood/brand/e46bb5ae43b4085ee9a2e2d576047a37-1x.png" 
                    srcset="https://cdn.robinhood.com/assets/robinhood/brand/e46bb5ae43b4085ee9a2e2d576047a37-1x.png, https://cdn.robinhood.com/assets/robinhood/brand/f399a1d9bf69ffa75c65e2d4aed8473b-2x.png 2x, https://cdn.robinhood.com/assets/robinhood/brand/b8c0239a85297be0e892b14387b9193d-3x.png 3x" 
                    role="presentation" draggable="false">
                </img>
            </div>
        </>
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
export default connect(mapStateToProps,mapDispatchToProps)(Portfolio);