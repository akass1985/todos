const todos = (state = [], action) => {
  switch (action.type) {
     case 'SAVE_TODO':	
       const existingTodoIdx = state.findIndex( t => t.id === action.item.id );
       let newState;
       if (existingTodoIdx > -1) {
         newState = [...state];
	 newState[existingTodoIdx] = action.item
       } else {
         newState = state.concat([action.item]);
       }
       return newState;
     case 'FETCH_TODOS':
       return [
         ...state,
         action.id
       ]
     default:
       return state
  }
}

export const getTodos = state => state.todos;
export default todos;
