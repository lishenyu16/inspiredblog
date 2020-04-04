import React, { Component, useEffect, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    outerDiv: {
        paddingTop:'20%',
        width:'100%',
        height:'min-content',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        position:'relative'
    },
}));

const EmailConfirmed = (props) => {
    const classes = useStyles();
    let history = useHistory();
    useEffect(()=>{
        let {code, userId} = props.match.params;
        console.log(props.match.params);
        props.confirmEmail(code,userId);
    },[])
    return (
        <React.Fragment>
            {props.auth.emailConfirmed?
                <div className={classes.outerDiv}>
                    <div style={{width:'100%',textAlign:'center',fontSize:'20px', marginBottom:'25px'}}>
                        Your email address is confirmed, please login with your account.
                    </div>
                    <div style={{width:'100%', textAlign:'center',}}>
                        <button 
                            onClick={()=>history.push('/login')} 
                            style={{padding:'5px 20px', fontSize:'inherit', backgroundColor:'lightcyan', borderRadius:'5px'}}
                        >
                            Login
                        </button>
                    </div>
                </div>
            :''}
        </React.Fragment>
    );
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        confirmEmail: (code, userId)=>dispatch({type:'CONFIRM_EMAIL', value: {code, userId}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EmailConfirmed)
