import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

const host = process.env.NODE_ENV === "production"?'':'http://localhost:5000';
function* createBlog(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    const data = {
        blogTitle: action.payload[0],
        blogContent: action.payload[1],
        blogCategory: action.payload[2],
    }
    let history = action.payload[3];
    axios.post(host + '/api/blogs/addBlog', data, header)
    .then((res)=>{
        history.push('/blogs/public-blogs');
    })
    .catch(err=>{
        alert('Failed to create blog, please try again later.');
        console.log(err);
    })
}

function* fetchBlogs(action){
    try {
        const result = yield axios.get(host + '/api/blogs/fetchBlogs');
        yield put({
            type: 'fetch_blogs_success',
            payload: result.data.blogs
        })
    }
    catch(err){
        alert('Failed to fetch blogs, please try again later.');
        console.log(err.response);
    }
}
function* fetchBlogDetail(action){
    let header = {
        headers: localStorage.getItem('token')? {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        } :null
    } 
    let history = action.payload.history;
    try {
        yield put({type: 'fetch_blogDetail_success', payload: null}); // clear existing blog
        const result = yield axios.get(host + `/api/blogs/blogDetail/${action.payload.id}`, header);
        yield put({
            type: 'fetch_blogDetail_success',
            payload: result.data.blog || null
        })
    }
    catch(err){
        if (err.response.data.message =='jwt expired.'){
            // alert('Authentication expired, please relogin.');
            return history.push('/blogs/login');
        }
        alert('Failed to fetch blog detail, please try again later.');
        return history.push('/blogs/');
    }
}
function* saveEdit(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    try {
        let blog = yield select(state => state.blog.blogDetail);
        const data = {
            blogId: blog.blog_id,
            blogTitle: action.payload.blogTitle,
            blogContent: action.payload.blogContent,
            blogCategory: action.payload.category,
        }
        const result = yield axios.post(host + `/api/blogs/editBlog`, data, header);
        yield put({
            type: 'fetch_blogDetail_success',
            payload: result.data.blog,
        })
        yield put({
            type: 'set_isEditing',
        })
    }
    catch(err){
        console.log(err.response);
        alert(err.response.data.message);
    }
}
function* deleteBlog(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    let history = action.value;
    try {
        let blog = yield select(state => state.blog.blogDetail);
        const data = {
            blogId: blog.blog_id,
        }
        const result = yield axios.post(host + `/api/blogs/deleteBlog`, data, header);
        history.push('/blogs/')
    }
    catch(err){
        console.log(err);
        if (err.response){
            if (err.response.data.message =='Token expired' || err.response.data.message =='Invalid token'){
                alert('Authentication expired, please relogin.');
                return history.push('/blogs/login');
            }
            else if (err.response.data.message == 'Not authorized'){
                return alert('You are not authorized to do this.');
            }
        }
        alert('Failed to delete this post, please try again later.');
    }
}

function* fetchCategories(action){
    try {
        const result = yield axios.get(host + `/api/blogs/categories`);
        yield put({
            type: 'fetch_categories_success',
            payload: result.data.data,
        })
    }
    catch(err){
        console.log(err);
        if (err.response){
            return alert(err.response.data.message);
        }
    }
}
function* fetchSingleCategory(action){
    try {
        let name = action.name;
        const result = yield axios.get(host + `/api/blogs/categories/${name}`);
        yield put({
            type: 'fetch_category_blogs_success',
            payload: result.data.data,
        })
    }
    catch(err){
        console.log(err);
        if (err.response){
            return alert(err.response.data.message);
        }
    }
}

function* switchPrivate(){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    try {
        let blog = yield select(state => state.blog.blogDetail);
        const data = {
            blogId: blog.blog_id,
        }
        const result = yield axios.post(host + `/api/blogs/switchPrivate`, data, header);
    }
    catch(err){
        console.log(err);
        if (err.response){
            if (err.response.data.message =='Token expired' || err.response.data.message =='Invalid token'){
                alert('Authentication expired, please relogin.');
                return history.push('/blogs/login');
            }
            else if (err.response.data.message == 'Not authorized'){
                return alert('You are not authorized to do this.');
            }
        }
        alert('Failed to to do this, please try again later.');
    }
} 
export function* watchBlogs(){
    yield takeLatest('SAVE_BLOG', createBlog);
    yield takeLatest('FETCH_BLOGS', fetchBlogs);
    yield takeLatest('FETCH_BLOG_DETAIL', fetchBlogDetail);
    yield takeLatest('SAVE_EDIT', saveEdit);
    yield takeLatest('DELETE_BLOG', deleteBlog);
    yield takeLatest('FETCH_CATEGORIES', fetchCategories);
    yield takeLatest('FETCH_SINGLE_CATEGORY', fetchSingleCategory);
    yield takeLatest('SWITCH_PRIVATE', switchPrivate);
}