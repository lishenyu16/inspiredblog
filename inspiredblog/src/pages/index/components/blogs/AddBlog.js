import React, { Component, useState, useEffect } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Delta from 'quill-delta';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6

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

const delta = new Delta([
    { insert: 'Gandalf', attributes: { bold: true } },
    { insert: ' the ' },
    { insert: 'Grey', attributes: { color: '#ccc' } }
]);

const AddBlog = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const [text, setText] = useState(null);
    const [title, setTitle] = useState('');
    const handleChange = (value) => {
        setText(value);
    }
    const save = ()=>{
        console.log(text);
    }
    const getContents = (value) => {
        console.log(value);
    }
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline'],  //,'strike', 'blockquote'
            [{ 'color': [] }, { 'background': [] }], 
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            // [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    }
    const  formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 
        'color','background',
        'list', 'bullet', 'indent',
        'link', 'image',
        // 'font',
        'align',
        'clean'
    ]

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
            <ReactQuill 
                value={text} 
                onChange={(content, delta, source, editor)=>handleChange(editor.getContents())} 
                getContents={getContents}
                theme="snow" 
                modules={modules}
                formats={formats}
                className={classes.quill}
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);