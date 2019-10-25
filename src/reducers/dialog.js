const visibilityDialog = (state = false, action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_DIALOG':
            return action.visibility
        default:
            return state
    }
}

export default visibilityDialog