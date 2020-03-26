import React, { Component, useEffect,useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

}));

const Blogs = (props) => {
    const classes = useStyles();
    let history = useHistory();
    return (
        <div>
            Here is the list of Blogs:
            <ul>
                <li>Good Blog</li>
                <li>Bad Blog</li>
                <li>mint Blog</li>
            </ul>

            <div style={{cursor:'pointer', display: props.auth.isLoggedIn?'':'none'}} onClick={()=>history.push('/addBlog')}>Add a blog</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);