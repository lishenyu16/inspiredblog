import React, { Component, useEffect, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

const EmailConfirmed = (props) => {
    const classes = useStyles();
    let history = useHistory();
    useEffect(()=>{
        let {code, email} = props.match.params;
        props.confirmEmail(code,email);
    },[])
    return (
        <div>
            <h1>Your email address is confirmed, please login with your account.</h1>
            <div>
                <button onClick={()=>history.push('/login')}>Login</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        confirmEmail: (code, email)=>dispatch({type:'confirmEmail', value: {code, email}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EmailConfirmed)
