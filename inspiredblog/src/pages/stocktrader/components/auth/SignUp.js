import React, { Component, useEffect, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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

const SignUp = (props) => {
    const classes = useStyles();
    let history = useHistory();
    // const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(()=>{
        props.clearErrors();
    },[])

    const clickOnSignup = () => {     
        if (username == null || username.trim().length==0){
            props.showErrors(true,'Please enter username',false,null,false,null);
        }   
        else if (password==null || password.trim().length < 6){
            props.showErrors(false,null,true,'Password must have at least 6 characters',false,null);
        }
        else if (password != confirmPassword){
            props.showErrors(false,null,false,null,true,'Passwords do not match');
        }
        else {
            props.onSignUp(username, password, history);
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
                    Sign up
                </Typography>
                <div style={{width:'100%', margin: '30px 0'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={props.auth.wrongUsername}
                                helperText={props.auth.usernameMessage}
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={props.auth.wrongPassword}
                                helperText={props.auth.passwordMessage}                           
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
                                error={props.auth.wrongConfirmPw}
                                helperText={props.auth.confirmPwMessage}                           
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
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>clickOnSignup()}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={()=>history.push('/stocktrader/login')} variant="body2">
                                Already have an account? Sign in
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
        onSignUp :(username, password, history)=> dispatch({type: 'SIGN_UP', data: {username, password, history}}),
        showErrors: (    
            wrongUsername,
            usernameMessage,
            wrongRegisterPw,
            registerPwMessage,
            wrongConfirmPw,
            confirmPwMessage) => dispatch({type: 'signup_fail', value: {
                wrongUsername,
                usernameMessage,
                wrongRegisterPw,
                registerPwMessage,
                wrongConfirmPw,
                confirmPwMessage
            }}),
        clearErrors: ()=> dispatch({type: 'clear_errors'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
