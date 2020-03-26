import React, { Component, useEffect, useState } from 'react';
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
    useEffect(()=>{
        props.fetchBlogs()
    },[]);
    return (
        <div style={{height: '100%'}}>
            Here is the list of Blogs:
            <ul>
                {props.blogs.publicBlogs.length>0?props.blogs.publicBlogs.map(ele=><li>{ele.blog_title}</li>):'nothing here'}
            </ul>

            <div style={{cursor:'pointer', display: props.auth.isLoggedIn?'':'none'}} onClick={()=>history.push('/addBlog')}>Add a blog</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        blogs: state.blog
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBlogs: ()=>dispatch({type:'FETCH_BLOGS'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);