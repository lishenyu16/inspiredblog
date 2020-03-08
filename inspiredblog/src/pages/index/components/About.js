
import React, {useState,useEffect} from 'react';
import { Switch, Route, Redirect, Link,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
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
const About = (props) => {
    const classes = useStyles();
    // let history = useHistory();

    useEffect(()=>{
    },[])


    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '50%', margin: '0 auto'}}>
            <h1>Current counter is {props.about.counter}</h1>
            <h3 onClick={()=>props.increment()}>+</h3>
            <h3 onClick={()=>props.decrement()}>-</h3>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        about: state.about
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch({type: 'INCREASE_ASYNC'}),
        decrement: () => dispatch({type: 'DECREASE'}) 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(About);