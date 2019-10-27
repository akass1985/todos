import { fetchTodos } from './actions'

function getTodos(){
  return dispatch => {
    dispatch(fetchTodos(1));
    return [
      {
        id: 1,
        title: 1
      }, 
      {
        id: 2,
        title: 2
      }, 
      { 
        id: 3,
        title: 3
      }
    ]
  }
}

export default getTodos;
