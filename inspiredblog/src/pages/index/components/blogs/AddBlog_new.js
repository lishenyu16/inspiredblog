import React, { Component, useState, useEffect } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import ReactMarkdown from 'react-markdown';
// import Editor from 'for-editor';
import Editor from 'for-editor-herb'
import axios from 'axios';
import { checkAuthState } from '../../selectors/authSelector';

const useStyles = makeStyles(theme => ({
    outerDiv: {
        display:'flex', 
        width:'100%', 
        flexDirection:'column', 
        alignItems:'center',
        padding:'50px',
        '@media(max-width: 600px)':{
            padding: '20px 0'
        }
    },
    quill: {
        width: '80%',
        height:'300px'
    },
    muiInput: {
        padding: '6px'
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

const AddBlog = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const [editorValue, setEditorValue] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    useEffect(()=>{
        if (props.auth.redirectPath){
            props.clearRedirectPath();
        }
    }, [])
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
        props.saveBlog(title,editorValue,history); // send to server
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
    return (
        <div className={classes.outerDiv}>
            <TextField 
                id="blog_title" 
                variant='outlined'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                style={{width:'90%'}}
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
                placeholder={'Start editing...'}
                language={'en'}
                toolbar={toolbar}
            />
            <div className={classes.buttons}>
                <Button className={classes.saveButton} variant="contained" onClick={()=>save()}>
                    Save
                </Button>
                <Button className={classes.saveButton} variant="contained" onClick={()=>history.push('/blogs/public-blogs')}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        // isLoggedIn: checkAuthState()
    }
}
// const mapStateToProps = state => ({
//     products: getCartProducts(state)
// })

const mapDispatchToProps = (dispatch) => {
    return {
        saveTemp: (title,value) => dispatch({type: 'save_temp_blog', payload: [title,value]}),
        saveBlog: (title,value,history) => dispatch({type: 'SAVE_BLOG', payload: [title,value,history]}),
        clearRedirectPath: () => dispatch({type:'redirect', url: null})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);