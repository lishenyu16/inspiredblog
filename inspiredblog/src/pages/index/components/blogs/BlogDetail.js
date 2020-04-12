import React, { Component, useEffect, useState  } from 'react';
import {Redirect, useHistory, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown'
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';
import CodeBlock from './CodeBlock';
import TextField from '@material-ui/core/TextField';
// import Editor from 'for-editor';
import Editor from 'for-editor-herb';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { checkAuthState } from '../../selectors/authSelector';

const useStyles = makeStyles(theme => ({
    detail: {
        // paddingTop:'20%',
        width:'100%',
        minHeight:'100vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        position:'relative',
        // '@media(max-width:500px)':{
        //     paddingTop:'10%'
        // }
    },
    title: {
        textTransform: 'capitalize', 
        fontSize:'25px',
        marginTop:'20%',
        // '&:hover': {
        //     textDecoration:'underline'
        //  },
    },
    publishedDate: {
        fontSize:'12px', 
        margin:'10px 0', 
        color:'lightgray'
    },
    editBlog: {
        position:'absolute',
        right:'3%',
        top:'5%',
    },
    arrowBack: {
        position:'absolute',
        left:'3%',
        top:'5%',
        '&:hover': {
            transform: 'scale(1.3)',
        },
        '@media(max-width:500px)':{
            fontSize:'12px',
            padding:'4px 12px'
        }
    },
    muiInput: {
        padding: '6px'
    },
    editor:{
        width:'80%',
        '@media(max-width:500px)':{
            width:'90%',
        }
    },
    buttons:{
        width:'50%', 
        display:'flex',
        justifyContent:'space-around', 
        marginTop:'20px',
        '@media(max-width:500px)':{
            width:'70%'
        }
    },
    saveButton:{
        padding: '6px 30px',
        fontSize:'15px',
        textTransform:'none',
    },
    outlinedPrimary: {
        color: 'rgb(26,151,240)',
        border: '1px solid rgb(26,151,240)',
        '&:hover': {
            backgroundColor: 'rgba(26,151,240,0.2)'
        },
    },
    buttonRoot: {
        borderRadius:'50%',
        textTransform:'none',
        padding: '16px 11px',
        minWidth: '0'
    },
}));

const BlogDetail = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [editorValue, setEditorValue] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [title, setTitle] = useState('');
    useEffect(()=>{
        props.fetchBlogDetail(props.match.params.blog_id, history);
    },[]);
    useEffect(()=>{
        if (props.blog.isEditing && props.auth.redirectPath){
            setTitle(props.blog.blogTempSave[0]);
            setEditorValue(props.blog.blogTempSave[1]);
            props.saveRedirectPath(null);
        }
    }, [])
    const handleChange = (value)=>{
        setEditorValue(value);
    }
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const uploadHandler = (file) => {
        console.log('file name: ' + file.name);
        let formData = new FormData();
        formData.append('file', file);

        let header = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        } 
        axios.post('http://localhost:5000/api/s3/uploadImage', formData, header)
        .then((res)=>{
            // setImageUrl(res.data.imageUrl);
            // let str = editorValue + '![alt]('+imageUrl+')';
            let str = editorValue + '<div style="text-align: center"><img style="max-width:50%" src="'+res.data.imageUrl+'"/></div>';
            setEditorValue(str);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const save = ()=>{
        props.saveTemp(title,editorValue); // save to reducer tempr
        if (checkAuthState()) {
            props.saveEdit(title,editorValue); // send to server
        }
        else {
            props.saveRedirectPath('/blogDetail/'+props.blog.blogDetail.blog_id);
            history.push('/blogs/login');
        }
    }

    const clickEdit = () => {
        setAnchorEl(null);
        if (checkAuthState()) {
            props.setIsEditing();
            setTitle(props.blog.blogDetail.blog_title);
            setEditorValue(props.blog.blogDetail.blog_content);
        }
        else {
            props.saveRedirectPath('/blogs/blogDetail/'+props.blog.blogDetail.blog_id);
            history.push('/blogs/login');
        }
    }
    const clickDelete = () => {
        setAnchorEl(null);
        if (checkAuthState()) {
            if (confirm('Are you sure to delete this post?')){
                return props.deleteBlog(history);
            }
            return;
        }
        else {
            props.saveRedirectPath('/blogs/blogDetail/'+props.blog.blogDetail.blog_id);
            history.push('/blogs/login');
        }
    }
    const toolbar = {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        img: true,
        list: true,
        para: true,       // parapraph
        table: true,
        quote: true,
        link: true,
        inlinecode: true,
        // code: true,
        collapse: true,
        // katex: true,
        preview: false,
        expand: true,
        // undo: true,
        // redo: true,
        // save: true,
        subfield: true,
        // toc: true   
    }
    return(
        <div className={classes.detail}>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={clickEdit}>
                    <i class="fas fa-edit" style={{marginRight: '10px'}}></i> Edit
                </MenuItem>
                <MenuItem onClick={clickDelete}>
                    <i class="fas fa-trash-alt" style={{marginRight: '10px'}}></i> Delete
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <i class="fas fa-lock" style={{marginRight: '10px'}}></i> Mark as private
                </MenuItem>
            </Menu>
            {props.blog.isEditing?
            // Editing block``````````````````````````````````
            <React.Fragment>
                <TextField 
                    id="blog_title" 
                    variant='outlined'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    style={{width:'90%',marginTop:'10%'}}
                    placeholder='Enter title here'
                    InputProps={{
                        classes:{
                            input: classes.muiInput
                        }
                    }}
                />
                <Editor 
                    style={{width:'90%'}}
                    height={'500px'}
                    addImg = {(file) => uploadHandler(file)}
                    value={editorValue} 
                    onChange={(value) => handleChange(value)} 
                    language={'en'}
                    toolbar={toolbar}
                />
                <div className={classes.buttons}>
                    <Button className={classes.saveButton} variant="contained" onClick={()=>save()}>
                        Save
                    </Button>
                    <Button className={classes.saveButton} variant="contained" onClick={()=>props.setIsEditing(false)} style={{background:'#e07453'}}>
                        Cancel
                    </Button>
                </div>
            </React.Fragment>:
            // detail block ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            props.blog.blogDetail?
            <React.Fragment>
                <div className={classes.arrowBack} style={{cursor:'pointer'}} onClick={()=>history.goBack()}>
                    <span class="material-icons" style={{color: 'rgba(29,161,242,1.00)'}}>
                        arrow_back_ios
                    </span>
                </div>
                <div className={classes.editBlog} style={{cursor:'pointer', display:!checkAuthState()?'none':localStorage.getItem('userId')==props.blog.blogDetail.user_id?'':'none'}} onClick={handleClick}>
                    <Button variant="outlined" color="primary" fullWidth
                        classes={{root:classes.buttonRoot, outlinedPrimary: classes.outlinedPrimary}}
                    >
                        <i class="fa fa-circle-o" aria-hidden="true" style={{fontSize:'5px', color: 'rgb(29,161,242)'}}></i>
                        <i class="fa fa-circle-o" aria-hidden="true" style={{fontSize:'5px', color: 'rgb(29,161,242)'}}></i>
                        <i class="fa fa-circle-o" aria-hidden="true" style={{fontSize:'5px', color: 'rgb(29,161,242)'}}></i>
                    </Button>
                </div>
                <div className={classes.title}>{props.blog.blogDetail.blog_title}</div>
                <div className={classes.publishedDate}>
                    Published on {format(new Date(props.blog.blogDetail.created_on), 'MM-dd-yyyy')} By 
                    <Link to={`/blogs/profile/${props.blog.blogDetail.user_id}`} style={{textDecoration:'none'}}>{' '+props.blog.blogDetail.username}</Link>
                </div>
                <div style={{width:'85%'}}>
                    <ReactMarkdown 
                        source={props.blog.blogDetail.blog_content}
                        escapeHtml={false}>
                        renderers={{code: CodeBlock}}
                    </ReactMarkdown>
                </div>
            </React.Fragment>:''}
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
        saveEdit: (title, editorValue) => dispatch({type:'SAVE_EDIT', payload: {blogTitle: title, blogContent: editorValue}}),
        saveTemp: (title,value) => dispatch({type: 'save_temp_blog', payload: [title,value]}),
        saveRedirectPath: (url) => dispatch({type: 'redirect', url: url}),
        deleteBlog: (history) => dispatch({type: 'DELETE_BLOG', value: history})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);