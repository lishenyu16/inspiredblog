import React, { Component, userEffect, useState } from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {checkAuthState} from '../../selectors/authSelector';
import isEmail from 'validator/lib/isEmail';
  
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: '16px 0 8px',
    },
}));

const ForgotPassword = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [email, setEmail] = useState(null);

    const clickOnSendConfirmation = () => {
        if (email==null || email.trim().length==0){
            props.showErrors(true,'Please enter your email');
        }
        else if (!isEmail(email)){
            props.showErrors(true,'Email is invalid');
        }
        else {
            props.findPassword(email, history);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Please enter your email
                </Typography>
                <div style={{width:'100%', margin: '30px 0'}}>
                    <TextField
                        error={props.auth.wrongFindEmail}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        helperText={props.auth.findEmailMessage}
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=>{
                            setEmail(e.target.value);
                            props.clearErrors();
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>clickOnSendConfirmation()}
                    >
                        Send Confirmation Email
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>history.push('/login')}
                    >
                        Back To Sign In
                    </Button>
                </div>
            </div>
        </Container>
    )
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth,
        isLoggedIn: checkAuthState(),
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        findPassword : (email, history)=> dispatch({type: 'FIND_PASSWORD', data: {email, history}}),
        showErrors: (wrongFindEmail,findEmailMessage) => dispatch({type: 'find_password_invalid', value: {wrongFindEmail,findEmailMessage}}),
        clearErrors: ()=> dispatch({type: 'clear_errors'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword)