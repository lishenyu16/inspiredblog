import React, { Component, useEffect, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {checkAuthState} from '../../selectors/authSelector';
  
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
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    useEffect(()=>{
        props.clearErrors();
    },[])

    let redirect = null;
    if(props.isLoggedIn){
        redirect = <Redirect to="/stocktrader/portfolio" />;   
    }
    const clickOnSignIn = () => {
        if (!username || username.trim().length==0){
            props.showErrors(true,false,null,'Please enter your username');
        }
        else if (!password || password.trim().length < 6){
            props.showErrors(false,true,'Password must contain at least 6 characters',null);
        }
        else {
            props.onSignIn(username, password);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            {redirect}
            {/* <CssBaseline /> */}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <div style={{width:'100%', margin: '30px 0'}}>
                    <TextField
                        error={props.auth.wrongUsername}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        helperText={props.auth.usernameMessage}
                        autoComplete="username"
                        autoFocus
                        onChange={(e)=>{
                            setUsername(e.target.value);
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
                        <Grid item>
                            <Link  variant="body2" onClick={()=>history.push('/stocktrader/signup')}>
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
        onSignIn : (username,password)=> dispatch({type: 'SIGN_IN', data: {username, password}}),
        showErrors: (wrongUsername,wrongPassword,passwordMessage,usernameMessage) => 
                    dispatch({type: 'signin_fail', value: {wrongUsername,wrongPassword,passwordMessage,usernameMessage}}),
        clearErrors: ()=> dispatch({type: 'clear_errors'}),
        // onSignUp :()=> dispatch({type: 'SIGN_UP'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);