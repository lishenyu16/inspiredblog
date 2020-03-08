const initialState = {
    title: 'my blog website'
}

const sitesReduder = (state=initialState, action) => {
    switch (action.type) {
        case 'EDIT': 
            return {
                ...state,
                title: action.payload.title
            }
        default: 
            return state
    }
}

export default sitesReduder;