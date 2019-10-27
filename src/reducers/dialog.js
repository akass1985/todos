const visibilityDialog = (state = false, action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_DIALOG':
            return action.visibility
        case 'EDIT_TODO':
            return true
        default:
            return state
    }
}

export default visibilityDialog
