import apiFetchTodos from '../middleware'

export const ActionTypes = {
  SAVE_TODO: "SAVE_TODO",
  EDIT_TODO: "EDIT_TODO",
  SET_VISIBILITY_FILTER: "SET_VISIILITY_FILTER",
  SET_VISIILITY_DIALOG: "SET_VISIBILITY_DIALOG",
  FETCH_TODO: "FETCH_TODO",
  FETCH_TODO_SUCCESS: "FETCH_TODO_SUCCESS",
  FETCH_TODO_FAILURE: "FETCH_TODO_FAILURE"
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const saveTodo = ( values ) => ({
  type: ActionTypes.SAVE_TODO,
  item: values
})

export const editTodo = id => ({
  type: ActionTypes.EDIT_TODO,
  id
})

export const setVisibilityFilter = filter => ({
  type: ActionTypes.FETCH_TODO_FAILURE,
  filter
})

export const showSaveDialog = visibility => ({
    type: ActionTypes.SET_VISIILITY_DIALOG,
    visibility
})

export const fetchTodo = () => (dispatch, getState) => {
  // const userId = selectCurrentUserId(getState());
  const userId = 1;
  if (userId != null) {
    dispatch({ type: ActionTypes.FETCH_TODO});
    apiFetchTodos(userId).then(
      data => dispatch(fetchTodoSuccess(data)),
      error => dispatch(fetchTodoFailure(error))
    );
  }
}

export const fetchTodoSuccess = data => ({
  type: ActionTypes.FETCH_TODO_SUCCESS,
  data
})

export const fetchTodoFailure = error => ({
  type: ActionTypes.FETCH_TODO_FAILURE,
  error
})