const initialState = {
    username: null,
    email: null,
    dateJoined: new Date(),
    publicInfo: null,
    following: 0,
    follower: 0,
    myBlogs: [],
    isSelf: false,
    showing: 'posts', // alternative: likes
}

const profileReducer = (state=initialState, action) => {

    switch (action.type){
        case 'get_profile_success':
            return {
                ...state,
                username: action.value.profileData.username,
                email: action.value.profileData.email || null,
                dateJoined: action.value.profileData.created_on,
                publicInfo: action.value.profileData.public_info,
                isSelf: action.value.isSelf,
                myBlogs: action.value.blogsData,
                // follower: action.data.follower,
                // following: action.data.following,
            }
        case 'switch_showing':
            return {
                ...state,
                showing: action.value,
            }
        case 'update_profile_success':
            return {
                ...state,
                username: action.value.username,
                publicInfo: action.value.publicInfo,
            }
        default:
            return state
    }
}

export default profileReducer;