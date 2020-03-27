import React, { Component, useEffect, useState  } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown'
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';

const useStyles = makeStyles(theme => ({
    detail: {
        padding:'20% 0',
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        position:'relative'
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
}));

const BlogDetail = (props) => {
    const classes = useStyles();
    let history = useHistory();
    useEffect(()=>{
        props.fetchBlogDetail(props.match.params.blog_id);
    },[]);

    return(
        <div className={classes.detail}>
            {props.blog.blogDetail?
                <React.Fragment>
                    <div className={classes.title}>{props.blog.blogDetail.blog_title}</div>
                    <div className={classes.publishedDate}>Published on {format(new Date(props.blog.blogDetail.created_on), 'MM-dd-yyyy')}</div>
                    <ReactMarkdown 
                        source={props.blog.blogDetail.blog_content}
                        escapeHtml={false}>
                    </ReactMarkdown>
                </React.Fragment>:
                <div>Blog Not Found</div>}
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