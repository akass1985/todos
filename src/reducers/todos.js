const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
              ...state,
              action.item
            ]
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id )
        case 'CHANGE_TODO':
            return state
        default:
          return state
          }
    }

export default todos