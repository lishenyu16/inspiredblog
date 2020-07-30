import React, { Component } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
    mainDiv: {
        marginTop:'90px',
        lineHeight:'1.5',
        '@media (max-width: 600px)': {
            marginTop:'50px',
        },
    },
    paragraph: {
        padding: '0 30px'
    }
});

const Home = () => {
    const classes = useStyles();
    // const [state, setState] = React.useState({
    //     left: false,
    // });
    // let history = useHistory();
    return (
        <div className={classes.mainDiv}>
            {/* <div v-if="isLoggedIn">Good {{time_status}} <i>{{user.username}}</i> & welcome to my blog !</div> */}
            <div className={classes.paragraph}>
                Glad you came by.<br />
                I wanted to welcome you and let you know I appreciate you spending time here at the blog very much.
                Everyone is so busy and life moves pretty fast, so I really do appreciate you taking time out of your busy day to check out my blog. Thanks.
            </div>
            <div className={classes.paragraph}>
                Another thing I will always appreciate is your feedback to the blog. If you have any comments or suggestions I welcome them and would love to hear them. Always.
                Not that all criticism is a fun thing but I think honest criticism given in an honest positive manner is something we can all learn and grow from if we are open to hearing it.  
                I will always listen to your ideas. So I do welcome your suggestions for the blog...
            </div>
            <div className={classes.paragraph}>
                Always.
            </div>
            <div className={classes.paragraph}>
                I will always do my best to bring you content that will interest, inspire, motivate and maybe even have you walking away
                thinking about and seeing things in a different way than before you came.  I want to blog about more than just computer science
                and…  Life is so much more than that and I want to touch on everything because I think our lives are more than just sitting in front of screens.
            </div>
            <div className={classes.paragraph}>
                This blog will always be changing because I am. You are. The world is. So don’t get too comfortable. I like to surprise
                from time to time, I just might throw you a curve ball every now and then.  😉
            </div>
            <div className={classes.paragraph}>Thanks for letting me,</div>
            <div className={classes.paragraph}>Shenyu 🙂</div>
        </div>
    )
}

export default Home;