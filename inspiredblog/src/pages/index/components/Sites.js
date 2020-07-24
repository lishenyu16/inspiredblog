
import React, { Component } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// import {connect} from 'react-redux';
const useStyles = makeStyles({
    main: {
        display:'flex',
        width:'100%',
        flexWrap: 'wrap',
        position: 'relative',
        flexDirection: 'column',
        alignItems:'center'
    },
})
const Sites = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <div style={{fontSize:'26px',width: '100%', textAlign: 'center',margin: '50px 0'}}>Other Websites</div>
            <div style={{width: '100%',padding: '0 10%'}}>
                <li><a href="/stocktrader" target="__blank">Stock Market App: Reacthood</a></li>
                <li><a href="https://lishenyu16.github.io/aboutMe/" target="__blank">Author Profile: About Me</a></li>
                <li><a href="https://lishenyu16.github.io/calculator/" target="__blank">Simple Vue App: A calculator</a></li>
                <li>Share Your Secrets(on the way)</li>
            </div>
        </div>
    );
}

export default Sites;