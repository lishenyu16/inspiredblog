const initialState = {
    blogs: [],
    editorValue: '',
    imageUrls: []
}

const blogReducer = (state=initialState, action) => {
    switch(action.type){
        case ('save_editor_value'):
            return {
                ...state,
                editorValue: action.payload
            }
        case ('create_blog_success'):
            return {
                ...state,
                editorValue: action.payload
            }
        case ('fetch_blogs_success'):
            return {
                ...state,
                blogs: action.payload
            }
        default: 
            return state
    }
}

export default blogReducer;