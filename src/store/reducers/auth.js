const initialState = {
    name: null,
    authenticated:false
};

const auth = (state, action) => {
    return {...state, name: action.name, authenticated: true}
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "AUTH": return auth(state, action);
        default:
            return state;
    }
};

export default reducer;