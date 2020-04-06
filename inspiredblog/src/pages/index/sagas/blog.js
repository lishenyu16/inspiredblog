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
        blogContent: action.payload[1]
    }
    let history = action.payload[2];
    axios.post(host + '/api/blogs/addBlog', data, header)
    .then(async (res)=>{
        // await put({
        //     type: 'create_blog_success'
        // })
        await history.push('/blogs');
    })
    .catch(err=>{
        alert('Failed to create blog, please try again later.');
        console.log(err.response);
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
    try {
        const result = yield axios.get(host + `/api/blogs/blogDetail/${action.payload}`, header);
        yield put({
            type: 'fetch_blogDetail_success',
            payload: result.data.blog || null
        })
    }
    catch(err){
        alert('Failed to fetch blog detail, please try again later.');
        console.log(err.response);
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

export function* watchBlogs(){
    yield takeLatest('SAVE_BLOG', createBlog);
    yield takeLatest('FETCH_BLOGS', fetchBlogs);
    yield takeLatest('FETCH_BLOG_DETAIL', fetchBlogDetail);
    yield takeLatest('SAVE_EDIT', saveEdit);
}