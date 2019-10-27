const todos = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_TODO':
            return [
              ...state,
              action.item
            ]
        default:
          return state
          }
    }

export default todos
