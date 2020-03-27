import React, { Component, useEffect, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';
const useStyles = makeStyles(theme => ({
    blogsDiv: {
        padding:'20% 0',
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        position:'relative'
    },
    item: {
        display:'flex',
        flexDirection:'column',
        width:'100%',
        alignItems:'center'
    },
    addBlog: {
        position:'absolute',
        right:'3%',
        top:'5%',
        border:'1px solid black',
        borderRadius:'5px',
        padding:'5px 15px',
        transition: 'transform 0.5s',
        '&:hover': {
            transform: 'scale(1.3)',
            border: '1px solid lightgray',
            background: 'cadetblue',
            color: 'white',
         },
    },
    divider: {
        width:'50%',
        height:'1px',
        borderTop:'1px solid lightgray',
        marginBottom:'20px'
    },
    title: {
        textTransform: 'capitalize', 
        fontSize:'25px',
        cursor:'pointer',
        '&:hover': {
            textDecoration:'underline'
         },
    },
    publishedDate: {
        fontSize:'12px', 
        margin:'10px 0', 
        color:'lightgray'
    },
    readEntire: {
        textTransform:'none',
        padding:'5px 15px',
        // border:'2px solid black',
        textDecoration:'underline',
        margin:'10px 0', 
        '&:hover': {
            color:'white',
            backgroundColor:'black'
         },
    }
}));

const Blogs = (props) => {
    const classes = useStyles();
    let history = useHistory();
    useEffect(()=>{
        props.fetchBlogs()
    },[]);
    const clickAdd = () => {
        if (props.auth.isLoggedIn){
            history.push('/addBlog');
        }
        else {
            history.push('/login');
        }
    }
    return (
        <div className={classes.blogsDiv}>
            <div className={classes.addBlog} style={{cursor:'pointer'}} onClick={clickAdd}>Post a blog</div>
            {props.blogs.publicBlogs.length>0?props.blogs.publicBlogs.map(ele=>
                <div className={classes.item}>
                    <div className={classes.title} onClick={()=>history.push(`/blogDetail/${ele.blog_id}`)}>{ele.blog_title}</div>
                    <div className={classes.publishedDate}>Published on {format(new Date(ele.created_on), 'MM-dd-yyyy')}</div>
                    <div>
                        <Button className={classes.readEntire} onClick={()=>history.push(`/blogDetail/${ele.blog_id}`)}>
                            Read the entire article..
                        </Button>
                    </div>
                    <div className={classes.divider} />
                </div>
            ):''}
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