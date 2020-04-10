import React, { Component , useEffect, useState } from 'react'
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import profile from '../img/profile.png';
import format from 'date-fns/format';
import {checkAuthState} from '../selectors/authSelector';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import calendarImg from '../img/calendar.jpg';

const useStyles = makeStyles(theme => ({
    outerDiv:{
        display:'flex',
        flexDirection:'column', 
        width: '100%',
        alignItems:'center'
    },
    topNav:{
        width:'100%',
        padding: '5px 0',
        fontSize: '25px',
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        width:'100%',
        backgroundColor: 'rgb(197,208,216)',
        height: '160px',
    },
    secondBanner: {
        position: 'relative',
        width: '95%', 
        display: 'flex', 
        justifyContent: 'flex-end',
        margin: '10px 0'
    },
    edit:{
        width:'20%',
        '@media(max-width:1100px)':{
            width:'23%'
        },
        '@media(max-width:800px)':{
            width:'25%'
        },
        '@media(max-width:600px)':{
            width:'28%'
        },
    },
    outlinedPrimary: {
        color: 'rgb(26,151,240)',
        border: '1px solid rgb(26,151,240)',
        '&:hover': {
            backgroundColor: 'rgb(202,215,241)'
        },
    },
    buttonRoot: {
        borderRadius:'20px',
        textTransform:'none',
    },
    imgHref: {
        display: 'block',
        width: '130px',
        height: '130px',
        padding: '5px',
        position: 'absolute',
        top: '-75px',
        left: '0px',
        backgroundColor:'white',
        padding: '5px',
        borderRadius: '50%',
    },
    photo: {
        width: '120px',
        borderRadius: '50%',
    },
    thirdBanner: {
        width:'95%',
        display: 'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        marginTop: '20px',
    },
    publicInfo: {
        width:'95%',
        textAlign: 'left',
        margin:'5px 0',
    },
    email: {
        width: '95%',
        color: 'rgb(101,119,134)',
        margin:'5px 0',
    },
    dateJoined: {
        width: '95%',
        color: 'rgb(101,119,134)',
        margin:'5px 0',
    },
    follow: {
        margin:'5px 0',
        width: '95%',
    },
    switch: {
        width:'100%',
        display:'flex',
        borderBottom:'1px solid lightgray'
    },
    switchButton:{
        color: 'rgb(101,119,134)',
        padding: '10px 0',
        textAlign: 'center',
        width:'50%',
        transitionDuration: '0.5s',
        '&:hover': {
            borderBottom: '2px solid rgba(29,161,242,1.00)',
            background: 'lightblue',
            color: 'rgba(29,161,242,1.00)',
        },
    },
    activeSwitchButton: {
        padding: '10px 0',
        textAlign: 'center',
        width:'50%',
        transitionDuration: '0.5s',
        color: 'rgba(29,161,242,1.00)',
        borderBottom: '2px solid rgba(29,161,242,1.00)',
        '&:hover': {
            background: 'lightblue',
        },
    }
}));


const Profile = (props) => {
    const classes = useStyles();
    let history = useHistory();
    // const [username, setUsername] = useState('');
    useEffect(()=>{
        if (!checkAuthState()){
            history.push('/blogs/login');
            return;
        }
        props.getProfile(props.match.params.targetId);
    },[props.match.params.targetId])
    
    return (
        <div className={classes.outerDiv}>
            <div className={classes.topNav}>
                <span class="material-icons" style={{color: 'rgb(29,161,242)', margin: '0 15px', cursor:'pointer'}} onClick={()=>history.goBack()}>
                    keyboard_backspace
                </span><span className='bolloBold'>{props.profile.username}</span> 
            </div>
            <div className={classes.header}>
            </div>
            <div className={classes.secondBanner}>
                <a href="https://lishenyu16.github.io/aboutMe/" className={classes.imgHref}>
                    <img src={profile} alt='profile' className={classes.photo}/>
                </a>
                {props.profile.isSelf?
                    <div className={classes.edit}>
                        <Button variant="outlined" color="primary" fullWidth 
                            classes={{root:classes.buttonRoot, outlinedPrimary: classes.outlinedPrimary}}>
                            Edit profile
                        </Button>
                    </div>:
                    <div className={classes.edit}>
                        <Button variant="outlined" color="primary" fullWidth 
                            classes={{root:classes.buttonRoot, outlinedPrimary: classes.outlinedPrimary}}>
                            Follow
                        </Button>
                    </div>
                }   
            </div>
            <div className={classes.thirdBanner}>
                <div style={{fontSize: '25px'}} className='belloBold'>{props.profile.username}</div>
                {props.profile.email?<div className={classes.email}>{props.profile.email}</div>:''}
                {props.profile.publicInfo?<div className={classes.publicInfo}>{props.profile.publicInfo}</div>:''}
                <div className={classes.dateJoined}>
                    <i class="fa fa-calendar" style={{fontSize:'16px'}}></i> Joined {format(new Date(props.profile.dateJoined), 'MMMM yyyy')}
                </div>
                <div className={classes.follow}>
                    {'193 following  0 followers'}
                </div>
            </div>
            <div className={classes.switch}>
                <div className={props.profile.showing=='posts'?classes.activeSwitchButton:classes.switchButton} onClick={()=>props.switchShowing('posts')}>Posts</div>
                <div className={props.profile.showing=='likes'?classes.activeSwitchButton:classes.switchButton} onClick={()=>props.switchShowing('likes')}>Likes</div>
            </div>
            {props.profile.showing=='posts'?
            <div style={{width:'100%', padding: '5% 10% 0'}}>
                {props.profile.myBlogs.map(b=>
                    <div style={{margin: '10px 0', cursor: 'pointer'}} key={b.blog_id}>
                        <span className='belloBold' style={{fontSize:'20px'}}>{b.blog_title}</span> - published on <span style={{color: 'rgb(101,119,134)'}}>{format(new Date(b.created_on), 'MM/dd/yyyy')}</span>
                    </div>)
                }
            </div>:''}
            {props.profile.showing=='likes'?
            <div>
                
            </div>:''}
        </div>
    )

}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth,
        profile: state.profile,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getProfile: (targetId)=> dispatch({type: 'GET_PROFILE', value: targetId}),
        switchShowing: (type)=> dispatch({type: 'switch_showing', value: type}),
        updateProfile: (username) => dispatch({type: 'UPDATE_PROFILE', payload: username}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)