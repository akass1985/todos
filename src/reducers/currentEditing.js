const currentEditing = (state = null, action) => {
  switch (action.type){
        case 'EDIT_TODO':
            return action.id
        default:
          return state
    }
}

export default currentEditing
