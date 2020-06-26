import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
// import About from './components/About';
import Home from './components/Home';
// import Sites from './components/Sites';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Verification from './components/auth/Verification';
import EmailConfirmed from './components/auth/EmailConfirmed';
import ForgotPassword from './components/auth/ForgotPassword';
import Profile from './components/Profile';
import {connect} from 'react-redux';
import Blogs from './components/blogs/Blogs';
import BlogDetail from './components/blogs/BlogDetail';
import AddBlog from './components/blogs/AddBlog_new';
// import AddBlog from './components/blogs/AddBlog';
import Category from './components/Category';
import SpecificCategory from './components/categories/SpecificCategory';
import NotFound from './components/NotFound';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ClassIcon from '@material-ui/icons/Class';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import profile from './img/profile.png';
import brand from './img/brand.png';
import DescriptionIcon from '@material-ui/icons/Description';
import Particles from 'react-particles-js';
import { checkAuthState } from './selectors/authSelector';
import Footer from './Footer';
import ResetPassword from './components/auth/ResetPassword';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const useStyles = makeStyles({
    list: {
        width: 180,
    },
    mobile: {
        position:'relative',
        '@media (min-width:601px)': {
            display: 'none'
        },
    },
    desktop: {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        // backgroundColor:'#f5f7f9',
        '@media (max-width: 600px)': {
            display: 'none'
        },
        // height:'100%',
        position:'relative'
    },
    desktopHeader: {
        width:'100%', 
        backgroundColor:'black',
        color:'white',
        height:'fit-content',
        fontFamily:'cursive',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    desktopLinks:{
        width:'100%',
        height:'200px',
        backgroundColor:'white',
        margin:'10px 0',
        display:'flex',
        flexDirection:'column',
    },
    desktopProfile: {
        width:'100%',
        padding:'20px 0',
        height:'max-content',
        backgroundColor:'white',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',

    },
    link: {
        height:'25%',
        width:'100%',
        paddingLeft:'20px',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    leftSectionDiv: {
        width:'15%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginRight:'2%',
        '@media(max-width: 1000px)': {
            width: '22%'
        },
        '@media(max-width: 800px)': {
            width: '25%'
        }
    },
    rightSectionDiv: {
        width:'50%',
        minHeight: '100vh',
        display:'flex',
        justifyContent:'center',
        backgroundColor:'white',
        position:'relative',
        paddingBottom:'2.5rem',
        '@media(max-width: 1000px)': {
            width: '60%'
        },
        '@media(max-width: 800px)': {
            width: '65%'
        }
    },
    mobileHeader: {
        width: '100%',
        height: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'black'
    },
    mobileBody: {
        width: '100%',
        minHeight: '646px',
        paddingBottom:'40px',
        position:'relative',
    },
    mobileSiteTitle: {
        fontSize: '20px',
        color: 'white',
        fontFamily: 'cursive'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200px',
        alignItems: 'center'
    },
    particles:{
        position:'absolute',
        zIndex:'-1',
        width:'100%',
        height:'100%',
        backgroundColor:'rgb(66,78,106)',
    }
});

const mql = window.matchMedia(`(max-width: 800px)`);

const App = (props) => {
	const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    const [mobile, setMobile] = React.useState(mql.matches);
    // const [mql, setMql] = React.useState(mql.matches); 
    // useEffect(()=>{
    //     props.checkAuthState();
    // },[])
    useEffect(()=>{
        props.trackUser();
    },[])
    const mediaQueryChanged = ()=> {
        setMobile(mql.matches);
    }
    useEffect(()=>{ // similar to componentWillMount. when it's unmounted, run the returned function
        // refer to this: https://zhuanlan.zhihu.com/p/21650585
        mql.addListener(mediaQueryChanged);
        return () =>{
            // setMql(mq);
            setMobile(mq.matches);
        }
    },[])
    let history = useHistory();
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
          <List>
                <ListItem button onClick={()=>history.push('/home')}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
                <ListItem button onClick={()=>history.push('/blogs/public-blogs')}>
                    <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <ListItemText primary={'Blogs'} />
                </ListItem>
                {/* <ListItem button onClick={()=>history.push('/sites')}>
                    <ListItemIcon><ClassIcon /></ListItemIcon>
                    <ListItemText primary={'Sites'} />
                </ListItem> */}
                <ListItem button onClick={()=>history.push('/blogs/categories')}>
                    <ListItemIcon><ClassIcon /></ListItemIcon>
                    <ListItemText primary={'Categories'} />
                </ListItem>
                {/* <ListItem button onClick={()=>history.push('/blogs/tags')}>
                    <ListItemIcon><LocalOfferIcon /></ListItemIcon>
                    <ListItemText primary={'Tags'} />
                </ListItem> */}
                {/* <ListItem button onClick={()=>history.push('/blogs/categories')}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary={'Search'} />
                </ListItem> */}
                <ListItem button onClick={()=>history.push(`/blogs/profile/${localStorage.getItem('userId')}`)}>
                    <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                    <ListItemText primary={'Your Profile'} />
                </ListItem>
                <ListItem button onClick={()=>history.push('/blogs/login')} style={{display: checkAuthState()?'none':''}}>
                    <ListItemIcon>
                        <i class="fas fa-sign-in-alt" style={{fontSize:'24px'}}></i>
                    </ListItemIcon>
                    <ListItemText primary={'Sign In'} />
                </ListItem>
                <ListItem button onClick={()=>props.onLogout(history)} style={{display: checkAuthState()?'':'none'}}>
                    <ListItemIcon>
                        <i class="fas fa-sign-out-alt" style={{fontSize:'24px'}}></i>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
          </List>
          <Divider />
          <List>
                <ListItem button onClick={()=>history.push('/myStory')}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={'Mail'} />
                </ListItem>
          </List>
        </div>
    );
    const router = (                    
    <Switch>         
        <Route path='/home' component = {Home}></Route>
        <Route path='/blogs/add-blog' component = {AddBlog}></Route>
        <Route path='/blogs/categories' exact component = {Category}></Route>
        <Route path='/blogs/categories/:category' component = {SpecificCategory}></Route>
        <Route path='/blogs/login' component = {SignIn}></Route>
        <Route path='/blogs/signup' component = {SignUp}></Route>
        <Route path='/blogs/forgot-password' component = {ForgotPassword}></Route>

        <Route path='/blogs/confirm-email/:code/:userId' component = {EmailConfirmed}></Route>
        <Route path='/blogs/verification' component = {Verification}></Route>
        <Route path='/blogs/reset-password/:code/:userId' component = {ResetPassword}></Route>

        <Route path='/blogs/profile/:targetId' component = {Profile}></Route>
        <Route path='/blogs/blog-detail/:blog_id' component = {BlogDetail}></Route>
        <Route path='/blogs/public-blogs' component = {Blogs}></Route>
        <Route path='/blogs' component = {Blogs}></Route>
        <Route exact path='/' component = {Home}></Route>
        <Route path='*' component = {NotFound}></Route>
    </Switch>)



	return (
		<React.Fragment>
			{!mobile?
            <div className={classes.desktop}>
                <Particles 
                    className={classes.particles}
                    params={{
                        "particles": {
                            "number": {
                                "value": 160,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": 10,
                                "random": true
                            },
                            "move": {
                                "direction": "bottom",
                                "out_mode": "out"
                            },
                            "line_linked": {
                                "enable": false
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onclick": {
                                    "enable": true,
                                    "mode": "remove"
                                }
                            },
                            "modes": {
                                "remove": {
                                    "particles_nb": 10
                                }
                            }
                        }
                    }}
                />
                <div className={classes.leftSectionDiv}>
                    <div className={classes.desktopHeader}>
                        <img src={brand} style={{maxWidth: '-webkit-fill-available'}}></img>
                        {/* Inspired Blogs */}
                    </div>
                    <div className={classes.desktopLinks}>
                        <div className={classes.link}>
                            <i class="material-icons" style={{marginRight:'5px',fontSize:'17px'}}>home</i>
                            <Link to='/' style={{textDecoration:'none'}}>Home</Link>
                        </div>
                        <div className={classes.link}>
                            <DescriptionIcon style={{marginRight:'5px', fontSize:'17px'}} />
                            <Link to='/blogs/public-blogs' style={{textDecoration:'none'}}>Blogs</Link>
                        </div>
                        {/* <div className={classes.link}>
                            <i class="material-icons" style={{marginRight:'5px',fontSize:'15px'}}>person</i>
                            <Link to='/about' style={{textDecoration:'none'}}>About Me</Link>
                        </div> */}
                        <div className={classes.link}>
                            <i class="material-icons" style={{marginRight:'5px',fontSize:'17px'}}>class</i>
                            <Link to='/blogs/categories' style={{textDecoration:'none'}}>Categories</Link>
                        </div>
                        {/* <div className={classes.link}>
                            <i class="fas fa-tags" style={{margin:'0 5px 0 1px',fontSize:'13px'}}></i>
                            <Link to='/blogs/tags' style={{textDecoration:'none'}}>Tags</Link>
                        </div> */}
                        {/* <div className={classes.link}>
                            <i class="fas fa-search" style={{marginRight:'5px',fontSize:'15px'}}></i>
                            <Link to='/blogs/categories' style={{textDecoration:'none'}}>Search</Link>
                        </div> */}
                        <div className={classes.link} style={{display: checkAuthState()?'':'none'}}>
                            <span class="material-icons" style={{marginRight:'5px',fontSize:'17px'}}>
                                account_box
                            </span>
                            <Link to={`/blogs/profile/${localStorage.getItem('userId')}`} style={{textDecoration:'none'}}>Your Profile</Link>
                        </div>
                        <div className={classes.link} style={{display: checkAuthState()?'none':'', }}>
                            <i class="fas fa-sign-in-alt" style={{marginRight:'5px', fontSize:'15px'}}></i>
                            <Link to='/blogs/login' style={{textDecoration:'none'}}>Sign In</Link>
                        </div>
                        <div className={classes.link} style={{display: checkAuthState()?'':'none'}}>
                            <i class="fas fa-sign-out-alt" style={{marginRight:'5px',fontSize:'15px'}}></i>
                            <Link to={null} onClick={()=>props.onLogout(history)} style={{textDecoration:'none'}}>Logout</Link>
                        </div>
                    </div>
                    <div className={classes.desktopProfile}>
                        <div style={{width:'100%',textAlign:'center'}}>
                            <img src={profile} style={{width:'50%'}} alt='profile' />
                        </div>
                        <div>
                            <a href='https://lishenyu16.github.io/aboutMe/' target='_blank' style={{textDecoration:'none'}}>霜之哀伤</a>
                        </div>
                    </div>
                </div>
                <div className={classes.rightSectionDiv}>
                    {router}
                    <Footer />
                </div>
            </div>:
			<div className={classes.mobile}>
				<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
					{sideList('left')}
				</Drawer>
				<div className={classes.mobileHeader}>
					<div style={{position: 'absolute', top: '20px', left: '20px'}}>
						<Button onClick={toggleDrawer('left', true)} style={{color:'white'}}>
                            {/* <MenuIcon /> */}
                            <i class="material-icons" style={{fontSize:'38px'}}>menu</i>
						</Button>
					</div>
					<div className={classes.mobileSiteTitle}>
						Inspired Blogs
					</div>
				</div>
                <div className={classes.mobileBody}>
                    {router}
                    <Footer />
                </div>
			</div>}
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        // isLoggedIn: checkAuthState()
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onSignIn: (email,password)=> dispatch({type: 'SIGN_IN', data: {email, password}}),
        onLogout: (history) => dispatch({type: 'logout', data: history}),
        // checkAuthState: () => dispatch({type: 'checkAuthState'}),
        trackUser: () => dispatch({type: 'TRACK_USER'}),
        // onSignUp :()=> dispatch({type: 'SIGN_UP'}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
