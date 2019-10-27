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
     default:
       return state
  }
}

export default todos
