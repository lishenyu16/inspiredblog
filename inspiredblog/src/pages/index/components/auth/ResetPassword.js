import React, { Component, useEffect, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        margin: theme.spacing(3, 0, 2),
    },
}));

const ResetPassword = (props) => {
    const classes = useStyles(); 
    let history = useHistory();
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [code, setCode] = useState(null);
    const [userId, setUserId] = useState(null);
    useEffect(()=>{
        let {code, userId} = props.match.params;
        setCode(code);
        setUserId(userId);
    },[])

    const clickOnReset = () => {     
        if (password==null || password.trim().length < 6){
            props.showErrors(true,'Password must have at least 6 characters',false,null);
        }
        else if (password !== confirmPassword){
            props.showErrors(false,null,true,'Passwords do not match');
        }
        else {
            props.onResetPw(code, userId, password, history);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <div style={{width:'100%', margin: '30px 0'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={props.auth.wrongResetPassword}
                                helperText={props.auth.resetPasswordMessage}                           
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={props.auth.wrongResetConfirmPassword}
                                helperText={props.auth.resetConfirmPasswordMessage}                           
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm password"
                                label="Confirm Password"
                                type="password"
                                id="confirm_password"
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>clickOnReset()}
                    >
                        Reset Password
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={()=>history.push('/blogs/login')} variant="body2">
                                Go To Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Container>
    );
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onResetPw :(code, userId,password, history)=> dispatch({type: 'RESET_PASSWORD', data: {code, userId, password, history}}),
        showErrors: (    
            wrongResetPassword,
            resetPasswordMessage,
            wrongResetConfirmPassword,
            resetConfirmPasswordMessage) => dispatch({type: 'reset_password_invalid', value: {
                wrongResetPassword,
                resetPasswordMessage,
                wrongResetConfirmPassword,
                resetConfirmPasswordMessage,
            }}),
        clearErrors: ()=> dispatch({type: 'clear_errors'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ResetPassword)
