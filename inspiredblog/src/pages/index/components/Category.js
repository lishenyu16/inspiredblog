import { makeStyles } from '@material-ui/core/styles';
import React, { Component, useEffect, useState  } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
// import {connect} from 'react-redux';
const useStyles = makeStyles(theme => ({
    outerDiv: {
        width:'100%',
        minHeight:'100vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding: '30px 20px'
    },
    title: {
        fontSize: '25px',
        '@media(max-width: 500px)': {
            fontSize: '17px'
        }
    },
    subtitle:{
        fontSize: '17px',
        margin: '10px 0 20px',
        '@media(max-width: 500px)': {
            fontSize: '12px'
        }
    },
    list: {
        width: '100%'
    }
}));
const Category = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [editorValue, setEditorValue] = useState('');
    useEffect(()=>{
        
    },[]);
    return (
        <div className={classes.outerDiv}>
            <div className={`${classes.title} sansBold`}>Category</div>
            <div className={classes.subtitle}>10 categories in total currently</div>
            <div className={classes.list}>
                <ul>
                    <li>javascript</li>
                    <li>php</li>
                    <li>node</li>
                    <li>react</li>
                    <li>vue</li>
                    <li>database</li>
                    <li>algorithms</li>
                    <li>network</li>
                    <li>system</li>
                    <li>other</li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        blog: state.blog,
        // isLoggedIn: checkAuthState()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setIsEditing: () => dispatch({type: 'set_isEditing'}),
        fetchBlogDetail: (id, history)=>dispatch({type:'FETCH_BLOG_DETAIL', payload:{id, history}}),
        saveEdit: (title, editorValue,category) => dispatch({type:'SAVE_EDIT', payload: {blogTitle: title, blogContent: editorValue,category}}),
        saveTemp: (title,value) => dispatch({type: 'save_temp_blog', payload: [title,value]}),
        saveRedirectPath: (url) => dispatch({type: 'redirect', url: url}),
        deleteBlog: (history) => dispatch({type: 'DELETE_BLOG', value: history})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);