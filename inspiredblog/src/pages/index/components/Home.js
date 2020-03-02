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

});

const Home = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });
    let history = useHistory();
    return (
        <div>
            This is home
        </div>
    )
}

export default Home;