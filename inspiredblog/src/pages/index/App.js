import React, { Component } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Sites from './components/Sites';
import Category from './components/Category';
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
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    list: {
        width: 180,
    },
    fullList: {
        width: 'auto',
    },
    mobile: {
        '@media (min-width:601px)': {
            display: 'none'
        },
    },
    desktop: {
        '@media (max-width: 600px)': {
            display: 'none'
        },
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
    mobileSiteTitle: {
        fontSize: '20px',
        color: 'white',
        fontFamily: 'cursive'
    },
    mobileBody: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200px',
        alignItems: 'center'
    }
});

const App = () => {
	const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
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
                <ListItem button onClick={()=>history.push('/about')}>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary={'About'} />
                </ListItem>
                <ListItem button onClick={()=>history.push('/sites')}>
                    <ListItemIcon><ClassIcon /></ListItemIcon>
                    <ListItemText primary={'Sites'} />
                </ListItem>
                <ListItem button onClick={()=>history.push('/categories')}>
                    <ListItemIcon><ClassIcon /></ListItemIcon>
                    <ListItemText primary={'Categories'} />
                </ListItem>
          </List>
          <Divider />
          <List>
                <ListItem button onClick={()=>history.push('/mail')}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={'Mail'} />
                </ListItem>
          </List>
        </div>
	);
	return (
		<React.Fragment>
			<div className={classes.desktop}>This is home!</div>
			<div className={classes.mobile}>
				<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
					{sideList('left')}
				</Drawer>
				<div className={classes.mobileHeader}>
					<div style={{position: 'absolute', top: '30%', left: '20px'}}>
						<Button onClick={toggleDrawer('left', true)} style={{color:'white'}}>
							<MenuIcon />
						</Button>
					</div>
					<div className={classes.mobileSiteTitle}>
						Inspired Blogs
					</div>
				</div>
				<div className={classes.mobileBody}>
					<Switch>
						<Route path='/about' component = {About}></Route>
						<Route path='/categories' component = {Category}></Route>
						<Route path='/sites' component = {Sites}></Route>
						<Route path='/home' component = {Home}></Route>
						<Route exact path='/' component = {Home}></Route>
						<Route path='*' component = {NotFound}></Route>
					</Switch>
				</div>
			</div>
		</React.Fragment>
	)
}


export default App;
