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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem'; 
import FormControl from '@material-ui/core/FormControl';
const Hljs = require('highlight.js');

const useStyles = makeStyles(theme => ({
    outerDiv: {
        display:'flex', 
        width:'100%', 
        flexDirection:'column', 
        alignItems:'flex-start',
        padding:'50px',
        '@media(max-width: 600px)':{
            padding: '20px 0',
            alignItems:'center',
        }
    },
    muiInput: {
        padding: '12px 6px'
    },
    buttons:{
        width:'90%', 
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
    outlinedLabel: {
        transform: 'translate(14px, 14px) scale(1)',
    },
    outlinedSelect: {
        padding: '10px',
    },
    formControlRoot: {
        width: '20%',
        '@media(max-width:1200px)':{
            width:'25%'
        },
        '@media(max-width:1000px)':{
            width:'30%'
        },
        '@media(max-width:800px)':{
            width:'35%'
        },
        '@media(max-width:600px)':{
            width:'30%'
        }
    }
}));

const AddBlog = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const [editorValue, setEditorValue] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    useEffect(()=>{
        if (props.auth.redirectPath){
            props.clearRedirectPath();
        }
    }, []);
    useEffect(()=>{
        Hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
        Hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
        Hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
        Hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
        Hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
        Hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'))
        Hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
    },[])
    const handleChange = (value)=>{
        setEditorValue(value);
    }
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
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
            let str = editorValue + '<div style="text-align: center"><img style="max-width:100%" src="'+res.data.imageUrl+'"/></div>';
            setEditorValue(str);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const save = ()=>{
        props.saveTemp(title,editorValue,category); // save to reducer tempr
        if (checkAuthState()) {
            if (title && category){
                props.saveBlog(title,editorValue,category,history); // send to server
            }
            else {
                return alert('Title and category can not be empty!');
            }
        }
        else {
            props.saveRedirectPath('/blogs/add-blog');
            history.push('/blogs/login');
        }
    }

    const toolbar = {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
        img: true,
        list: true,
        para: {
          paragraph: true,            // control the whole part if you don't want to display
          italic: true,
          bold: true,
          bolditalic: true,
          delline: true,
          underline: true,
          keytext: true,
          superscript: true,
          subscript: true,
          marktag: true
        },
        table: true,
        quote: true,
        link: true,
        inlinecode: true,
        code: true,
        collapse: true,
        preview: true,
        expand: true,
        subfield: true,
    }
    const options = [
        {id: 1, description: 'javascript'},
        {id: 2, description: 'php'},
        {id: 3, description: 'node '},
        {id: 4, description: 'react'},
        {id: 5, description: 'vue'},
        {id: 6, description: 'database'},
        {id: 7, description: 'algorithms'},
        {id: 8, description: 'network'},
        {id: 9, description: 'system'},
        {id: 10, description: 'other' }
    ]
    return (
        <div className={classes.outerDiv}>
            <FormControl variant="outlined" style={{margin: '10px 0'}} classes={{root: classes.formControlRoot}}>
                <InputLabel id="category-label" classes={{outlined: classes.outlinedLabel}}>Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    onChange={handleChangeCategory}
                    label="Category"
                    classes={{outlined: classes.outlinedSelect}}
                >
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    {options.map(op =>(
                        <MenuItem value={op.id}>{op.description}</MenuItem>
                    ))}
                </Select>
            </FormControl>
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
                highlight={Hljs.highlightAuto}
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

const mapDispatchToProps = (dispatch) => {
    return {
        saveTemp: (title,value,category) => dispatch({type: 'save_temp_blog', payload: [title,value,category]}),
        saveBlog: (title,value,category,history) => dispatch({type: 'SAVE_BLOG', payload: [title,value,category,history]}),
        clearRedirectPath: () => dispatch({type:'redirect', url: null})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);