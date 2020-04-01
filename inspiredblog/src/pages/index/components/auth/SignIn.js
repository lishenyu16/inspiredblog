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

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="shenyu16.com">
                shenyu16.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
  
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
    // useEffect(()=>{
    //     props.checkAuthState()
    // },[props.isAuthenticated])
    // useEffect(()=>{
    //     props.initTrade()
    // },[])
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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e)=>setPassword(e.target.value)}
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
                        onClick={()=>props.onSignIn(email, password)}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
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
            <Box mt={8}>
                <Copyright />
            </Box>
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
        onSignIn :(email,password)=> dispatch({type: 'SIGN_IN', data: {email, password}}),
        // onSignUp :()=> dispatch({type: 'SIGN_UP'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)