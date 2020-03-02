
import React, { Component } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
// import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    list: {
        width: 200,
    },
    fullList: {
        width: 'auto',
    },
    mobile: {
        '@media (min-width:601px)': {
            display: 'none'
        },
    },
    desktop: {
        '@media (max-width: 600px)': {
            display: 'none'
        },
    },
    mobileHeader: {
        width: '100%',
        height: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'black'
    },
    mobileSiteTitle: {
        fontSize: '20px',
        color: 'white',
        fontFamily: 'cursive'
    },
    mobileBody: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200px',
        alignItems: 'center'
    }
});
const About = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    let history = useHistory();

    return (
        <div>
            This is about
        </div>
    )
}

export default About;