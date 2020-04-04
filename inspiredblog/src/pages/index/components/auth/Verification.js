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

const Verification = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [resent, setResent] = useState(false);
    return (
        <div className={classes.outerDiv}>
            <div style={{display:resent?'none':'',fontSize:'20px',width:'100%', padding:'20px'}}>
                We have sent you an email including the link to confirm your email, please check your email box.
            </div>
            <div style={{display:resent?'none':'',width:'100%', textAlign:'center'}}>
                <button onClick={()=>setResent(true)} style={{padding:'5px 12px', fontSize:'inherit', backgroundColor:'lightcyan'}}>
                    Resend confirmation email
                </button>
            </div>
            <div style={{display:resent?'':'none', fontSize:'20px',width:'100%', padding:'20px'}}>
                An email with confirmation link has been resent to your email box. If you still have not received it, please check your email spam folder.
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
        confirmEmail: (code, userId)=>dispatch({type:'CONFIRM_EMAIL', value: {code, userId}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Verification)
