import React, { Component , useEffect, useState } from 'react'
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

}));


const Profile = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [username, setUsername] = useState('');
    useEffect(()=>{
        setUsername(localStorage.getItem('username'));
    },[props.auth.username])
    
    return (
        <div style={{display:'flex',flexDirection:'column',}}>
            <div style={{margin: '30px 0'}}>
                <span style={{verticalAlign:'bottom',marginRight:'10px'}}>Username: </span>
                <TextField 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    id="username" 
                    // label="Username" 
                />
            </div>
            <Button variant="contained" color="primary" onClick={()=>props.updateProfile(username)}>
                Save
            </Button>
        </div>
    )

}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onSignIn :(email,password)=> dispatch({type: 'SIGN_IN', data: {email, password}}),
        updateProfile: (username) => dispatch({type: 'UPDATE_PROFILE', payload: username})
        // onSignUp :()=> dispatch({type: 'SIGN_UP'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)