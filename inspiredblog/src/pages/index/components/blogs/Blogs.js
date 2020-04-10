import React, { Component, useEffect, useState } from 'react';
import {Redirect, useHistory, Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';
import { checkAuthState } from '../../selectors/authSelector';

const useStyles = makeStyles(theme => ({
    blogsDiv: {
        paddingTop:'20%',
        width:'100%',
        height:'min-content',
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
        left:'3%',
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
        '@media(max-width:500px)':{
            fontSize:'12px',
            padding:'4px 12px'
        }
    },
    divider: {
        width:'50%',
        height:'1px',
        borderTop:'1px solid lightgray',
        marginBottom:'50px'
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
        props.fetchBlogs();
    },[]);
    const clickAdd = () => {
        if (checkAuthState()){
            history.push('/blogs/add-blog');
        }
        else {
            props.redirect(); //save previous path into store
            history.push('/blogs/login');
        }
    }
    return (
        <div className={classes.blogsDiv}>
            <div className={classes.addBlog} style={{cursor:'pointer'}} onClick={clickAdd}>Post a blog</div>
            {props.blogs.publicBlogs.length>0?props.blogs.publicBlogs.map(ele=>
                <div className={classes.item} key={ele.blog_id}>
                    <div className={`${classes.title} belloBold`} onClick={()=>history.push(`/blogs/blog-detail/${ele.blog_id}`)}>{ele.blog_title}</div>
                    <div className={classes.publishedDate}>
                        Published on {format(new Date(ele.created_on), 'MM-dd-yyyy')} By  
                        <Link to={`/blogs/profile/${ele.user_id}`} style={{textDecoration:'none'}}>{' '+ele.username}</Link>
                    </div>
                    <div>
                        <Button className={classes.readEntire} onClick={()=>history.push(`/blogs/blog-detail/${ele.blog_id}`)}>
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
        blogs: state.blog,
        // isLoggedIn: checkAuthState(),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        redirect: ()=>dispatch({type: 'redirect', url: '/blogs/add-blog'}),
        fetchBlogs: ()=>dispatch({type:'FETCH_BLOGS'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);