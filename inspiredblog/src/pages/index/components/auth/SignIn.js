import React, { Component, userEffect, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    let redirect = null;
    if(props.isLoggedIn){
        if (props.auth.redirectPath){
            redirect = <Redirect to={props.auth.redirectPath} />
        }
        else {
            redirect = <Redirect to="/" />;   
        }
    }
    const clickOnSignIn = () => {
        if (email==null || email.trim().length==0){
            props.showErrors(true,false,null,'Please enter your email');
        }
        else if (!isEmail(email)){
            props.showErrors(true,false,null,'Email is invalid');
        }
        else if (password==null || password.trim().length < 6){
            props.showErrors(false,true,'Password must contain at least 6 characters',null);
        }
        else {
            props.onSignIn(email, password);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            {redirect}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div style={{width:'100%', margin: '30px 0'}}>
                    <TextField
                        error={props.auth.wrongEmail}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        helperText={props.auth.emailMessage}
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=>{
                            setEmail(e.target.value);
                            props.clearErrors();
                        }}
                    />
                    <TextField
                        error={props.auth.wrongPassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        helperText={props.auth.passwordMessage}
                        autoComplete="current-password"
                        onChange={(e)=>{
                            setPassword(e.target.value);
                            props.clearErrors();
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        // onClick={()=>props.onSignIn(email, password)}
                        onClick={()=>clickOnSignIn()}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2" onClick={()=>history.push('/forgotPassword')}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link  variant="body2" onClick={()=>history.push('/signup')}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
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
        onSignIn : (email,password)=> dispatch({type: 'SIGN_IN', data: {email, password}}),
        showErrors: (wrongEmail,wrongPassword,passwordMessage,emailMessage) => dispatch({type: 'signin_fail', value: {wrongEmail,wrongPassword,passwordMessage,emailMessage}}),
        clearErrors: ()=> dispatch({type: 'clear_errors'}),
        // onSignUp :()=> dispatch({type: 'SIGN_UP'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)