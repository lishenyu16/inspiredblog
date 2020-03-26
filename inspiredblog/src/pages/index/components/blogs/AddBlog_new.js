import React, { Component, useState, useEffect } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import ReactMarkdown from 'react-markdown';
import Editor from 'for-editor';
import axios from 'axios';

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
    saveButton:{
        padding: '6px 30px',
        fontSize:'15px',
        marginTop:'45px',
        textTransform:'none',
        '@media(max-width:1188px)': {
            marginTop: '70px'
        },
        '@media(max-width:683px)': {
            marginTop: '95px'
        },
    }
}));

const AddBlog = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const [editorValue, setEditorValue] = useState('');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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
        .then( async (res)=>{
            await setImageUrl(res.data.imageUrl);
            let str = editorValue + '![alt]('+imageUrl+')';
            setEditorValue(str);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const save = ()=>{
        props.saveEditorValue(title,editorValue); // save to reducer tempr
        props.saveBlog(title,editorValue,history); // send to server
    }
    return (
        <div className={classes.outerDiv}>
            <TextField 
                id="blog_title" 
                variant='outlined'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                style={{width:'80%'}}
                placeholder='Enter titler here'
                InputProps={{
                    classes:{
                        input: classes.muiInput
                    }
                }}
            />
            <Editor 
                ref={vm}
                style={{width:'80%'}}
                className="my-editor"
                subfield = {true}
                preview = {true}
                addImg = {(file) => uploadHandler(file)}
                value={editorValue} 
                onChange={(value) => handleChange(value)} 
                placeholder={'Start editing...'}
                language={'en'}
            />

            <Button className={classes.saveButton} variant="contained" onClick={()=>save()}>
                Save
            </Button>
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
        saveEditorValue: (title,value) => dispatch({type: 'save_editor_value', payload: [title,value]}),
        saveBlog: (title,value,history) => dispatch({type: 'SAVE_BLOG', payload: [title,value,history]})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);