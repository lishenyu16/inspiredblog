import React, { Component, useEffect, useState  } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles(theme => ({

}));

const BlogDetail = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [blog, setBlog] = useState(null);
    useEffect(()=>{
        console.log('something');
    },[]);

    return(
        <div style={{height:'100%', display: blog?'':'none'}}>
            <div style={{marginBottom:'20px'}}>{blog.blog_title}</div>
            <ReactMarkdown 
                source={blog.blog_content}
                escapeHtml={false}>
            </ReactMarkdown>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        blog: state.blog
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchBlogDetail: (id)=>dispatch({type:'FETCH_BLOG_DETAIL', payload:id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);