import React, { Component , useEffect, useState } from 'react'
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import profile from '../img/profile.png';
import format from 'date-fns/format';
import {checkAuthState} from '../selectors/authSelector';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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
    },
    blogEntry: {
        margin: '10px 0', 
        cursor: 'pointer',
        transitionDuration: '0.5s',
        '&:hover':{
            backgroundColor: 'lightgray'
        }
    }
}));

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        color: 'rgba(29,161,242,1.00)',
    },
    dialogTitleRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px'
    },
    filledPrimary: {
        color: 'white',
        backgroundColor: 'rgba(29,161,242,1.00)',
        '&:hover': {
            backgroundColor: 'rgb(29,161,242,0.5)'
        },
    },
    buttonRoot: {
        borderRadius:'20px',
        textTransform:'none',
    },
});
  
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, onSave, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other} classes={{root: classes.dialogTitleRoot}}>
            <div style={{width: 'fit-content', display: 'flex', alignItems:'center'}}>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <div style={{fontSize:'25px'}} className='sansSemiBold'>{children}</div>
            </div>
            <div style={{width: 'fit-content', display: 'flex', alignItems:'center'}}>
                <Button variant="contained" color='primary' fullWidth onClick={onSave}
                    classes={{root:classes.buttonRoot, containedPrimary: classes.containedPrimary}}>
                    <span className='sansSemiBold'>Save</span>
                </Button>
            </div>
        </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
  
const Profile = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setUsername(props.profile.username);
        setBio(props.profile.publicInfo);
        setOpen(false);
    };
    useEffect(()=>{
        if (!checkAuthState()){
            history.push('/blogs/login');
            return;
        }
        props.getProfile(props.match.params.targetId);
    },[props.match.params.targetId])
    useEffect(()=>{
        setUsername(props.profile.username);
        setBio(props.profile.publicInfo);
        setOpen(false);
    }, [props.profile.username,props.profile.publicInfo])
    // useEffect(()=>{
    //     setBio(props.profile.publicInfo);
    // }, [props.profile.publicInfo])
    
    return (
        <div className={classes.outerDiv}>
            <Dialog onClose={handleClose} maxWidth='sm' fullWidth  open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} onSave={()=>props.updateProfile(username,bio)}>
                    <span className='sansSemiBold'>Edit profile</span>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <div className={classes.header}>
                        </div>
                        <div className={classes.secondBanner}>
                            <a style={{marginLeft:'20px'}} href="https://lishenyu16.github.io/aboutMe/" className={classes.imgHref} target='__blank'>
                                <img src={profile} alt='profile' className={classes.photo}/>
                            </a>  
                        </div>
                        <TextField
                            id="filled-full-width"
                            label="Username"
                            style={{ marginTop: 46 }}
                            placeholder="Add your username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                        <TextField
                            id="filled-full-width"
                            label="Bio"
                            multiline
                            rowsMax="4"
                            style={{ marginTop: 10 }}
                            placeholder="Add your bio"
                            value={bio}
                            onChange={(e)=>setBio(e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </Typography>
                </DialogContent>
            </Dialog>
            <div className={classes.topNav}>
                <span class="material-icons" style={{color: 'rgb(29,161,242)', margin: '0 15px', cursor:'pointer'}} onClick={()=>history.goBack()}>
                    keyboard_backspace
                </span><span className='sansSemiBold'>{props.profile.username}</span> 
            </div>
            <div className={classes.header}>
            </div>
            <div className={classes.secondBanner}>
                <a href="https://lishenyu16.github.io/aboutMe/" className={classes.imgHref}>
                    <img src={profile} alt='profile' className={classes.photo}/>
                </a>
                {props.profile.isSelf?
                    <div className={classes.edit}>
                        <Button variant="outlined" color="primary" fullWidth onClick={handleClickOpen}
                            classes={{root:classes.buttonRoot, outlinedPrimary: classes.outlinedPrimary}}>
                            <span className='sansSemiBold'>Edit profile</span>
                        </Button>
                    </div>:
                    <div className={classes.edit}>
                        <Button variant="outlined" color="primary" fullWidth 
                            classes={{root:classes.buttonRoot, outlinedPrimary: classes.outlinedPrimary}}>
                            <span className='sansSemiBold'>Follow</span>
                        </Button>
                    </div>
                }   
            </div>
            <div className={classes.thirdBanner}>
                <div style={{fontSize: '25px'}} className='sansSemiBold'>{props.profile.username}</div>
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
                    <div className={classes.blogEntry} key={b.blog_id} onClick={()=>history.push(`/blogs/blog-detail/${b.blog_id}`)}>
                        <span className='sansSemiBold' style={{fontSize:'20px'}}>{b.blog_title}</span> - published on <span style={{color: 'rgb(101,119,134)'}}>{format(new Date(b.created_on), 'MM/dd/yyyy')}</span>
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
        updateProfile: (username,publicInfo) => dispatch({type: 'UPDATE_PROFILE', value: {username, publicInfo}}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)