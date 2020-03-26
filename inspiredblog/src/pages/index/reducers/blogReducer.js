const initialState = {
    publicBlogs: [],
    editorValue: '',
    imageUrls: [],
}

const blogReducer = (state=initialState, action) => {
    switch(action.type){
        case ('save_editor_value'):
            return {
                ...state,
                editorValue: action.payload
            }
        case ('fetch_blogs_success'):
            console.log('getting here')
            return {
                ...state,
                publicBlogs: action.payload
            }
        default: 
            console.log('coming to default reducer.')
            return state
    }
}

export default blogReducer;