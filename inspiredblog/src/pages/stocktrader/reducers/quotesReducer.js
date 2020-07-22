const initialState = {

}

const quotesReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'love':
            return {
                ...state,
                 
            }
        default: 
            return state;
    }
}