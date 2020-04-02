import React, { Component, useEffect, useState  } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown'
import Button from '@material-ui/core/Button';
import format from 'date-fns/format';
import CodeBlock from './CodeBlock';
import TextField from '@material-ui/core/TextField';
import Editor from 'for-editor';
import axios from 'axios';
import { checkAuthState } from '../../selectors/authSelector';

const useStyles = makeStyles(theme => ({
    detail: {
        // paddingTop:'20%',
        width:'100%',
        height:'100%',
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
        marginTop:'10%',
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
    }
}));

const BlogDetail = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [editorValue, setEditorValue] = useState('');
    const [title, setTitle] = useState('');
    useEffect(()=>{
        props.fetchBlogDetail(props.match.params.blog_id);
    },[]);
    useEffect(()=>{
        if (props.blog.isEditing && props.auth.redirectPath){
            setTitle(props.blog.blogTempSave[0]);
            setEditorValue(props.blog.blogTempSave[1]);
            props.saveRedirectPath(null);
        }
    }, [])
    const vm = React.createRef();
    const handleChange = (value)=>{
        setEditorValue(value);
    }
    const uploadHandler = (file) => {
        vm.current.$img2Url(file.name, 'file_url');
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
            history.push('/login');
        }
    }

    const clickEdit = () => {
        if (checkAuthState()) {
            props.setIsEditing();
            setTitle(props.blog.blogDetail.blog_title);
            setEditorValue(props.blog.blogDetail.blog_content);
        }
        else {
            props.saveRedirectPath('/blogDetail/'+props.blog.blogDetail.blog_id);
            history.push('/login');
        }
    }
    const toolbar =  {
        h1: true, // h1
        h2: true, // h2
        img: true, // 图片
        link: true, // 链接
        code: true, // 代码块
        preview: true, // 预览
        expand: true, // 全屏
        undo: true, // 撤销
        // redo: true, // 重做
        // save: true, // 保存
        subfield: true, // 单双栏模式
    }
    return(
        <div className={classes.detail}>
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
                    ref={vm}
                    style={{width:'90%'}}
                    height={'500px'}
                    subfield = {true}
                    preview = {false}
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
                <div className={classes.arrowBack} style={{cursor:'pointer'}} onClick={()=>history.push('/blogs')}>
                    <span class="material-icons">
                        arrow_back_ios
                    </span>
                </div>
                <div className={classes.editBlog} style={{cursor:'pointer', display:checkAuthState()?'':'none'}} onClick={clickEdit}>
                    Edit
                </div>
                <div className={classes.title}>{props.blog.blogDetail.blog_title}</div>
                <div className={classes.publishedDate}>
                    Published on {format(new Date(props.blog.blogDetail.created_on), 'MM-dd-yyyy')} By {props.blog.blogDetail.username}
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
        fetchBlogDetail: (id)=>dispatch({type:'FETCH_BLOG_DETAIL', payload:id}),
        saveEdit: (title, editorValue) => dispatch({type:'SAVE_EDIT', payload: {blogTitle: title, blogContent: editorValue}}),
        saveTemp: (title,value) => dispatch({type: 'save_temp_blog', payload: [title,value]}),
        saveRedirectPath: (url) => dispatch({type: 'redirect', url: url}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);