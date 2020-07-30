const initialState = {
    publicBlogs: [],
    blogTempSave: null,
    imageUrls: [],
    blogDetail: null,
    isEditing: false,
    categories: [],
    categoryBlogs: [],
}

const blogReducer = (state=initialState, action) => {
    switch(action.type){
        case ('set_isEditing'):
            return {
                ...state,
                isEditing: !state.isEditing
            }
        case ('save_temp_blog'):
            return {
                ...state,
                blogTempSave: action.payload
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
        case ('fetch_categories_success'):
            return {
                ...state,
                categories: action.payload
            }
        case ('fetch_category_blogs_success'):
            return {
                ...state,
                categoryBlogs: action.payload
            }
        default: 
            console.log('coming to default reducer.')
            return state
    }
}

export default blogReducer;