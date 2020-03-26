import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';


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
    axios.post('http://localhost:5000/api/blogs/addBlog', data, header)
    .then(async (res)=>{
        // await put({
        //     type: 'create_blog_success'
        // })
        await history.push('/blogs');
    })
    .catch(err=>{
        alert('Failed to create blog, please try again later.');
        console.log(err);
    })
}

function* fetchBlogs(action){
    try {
        const result = yield axios.post('http://localhost:5000/api/blogs/fetchBlogs');
        yield put({
            type: 'fetch_blogs_success',
            payload: result.data.blogs
        })
    }
    catch(err){
        alert('Failed to create blog, please try again later.');
        console.log(err);
    }
}
function* fetchBlogDetail(action){
    try {
        const result = yield axios.post('http://localhost:5000/api/blogs/fetchBlogs');
        yield put({
            type: 'fetch_blogs_success',
            payload: result.data.blogs
        })
    }
    catch(err){
        alert('Failed to create blog, please try again later.');
        console.log(err);
    }
}

export function* watchBlogs(){
    yield takeLatest('SAVE_BLOG', createBlog);
    yield takeLatest('FETCH_BLOGS', fetchBlogs);
    yield takeLatest('FETCH_BLOG_DETAIL', fetchBlogDetail);
}