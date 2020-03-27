const initialState = {
    publicBlogs: [],
    editorValue: '',
    imageUrls: [],
    blogDetail: null,
}

const blogReducer = (state=initialState, action) => {
    switch(action.type){
        case ('save_editor_value'):
            return {
                ...state,
                editorValue: action.payload
            }
        case ('fetch_blogs_success'):
            return {
                ...state,
                publicBlogs: action.payload
            }
        case ('fetch_blogDetail_success'):
            return {
                ...state,
                blogDetail: action.payload
            }
        default: 
            console.log('coming to default reducer.')
            return state
    }
}

export default blogReducer;