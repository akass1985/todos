import apiFetchTodos from '../middleware'

export const ActionTypes = {
  SAVE_TODO: "SAVE_TODO",
  EDIT_TODO: "EDIT_TODO",
  SET_VISIBILITY_FILTER: "SET_VISIILITY_FILTER",
  SET_DIALOG_VISIBILITY: "SET_DIALOG_VISIBILITY",
  FETCH_TODO: "FETCH_TODO",
  FETCH_TODO_SUCCESS: "FETCH_TODO_SUCCESS",
  FETCH_TODO_FAILURE: "FETCH_TODO_FAILURE",
  DB_DISCONNECT: "DB_DISCONNECT"
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const saveTodo = values => ({
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

export const setDialogVisibilityAction = dialogVisibility => ({
    type: ActionTypes.SET_DIALOG_VISIBILITY,
    dialogVisibility
})

export const fetchTodo = () => (dispatch, getState) => {
  // const userId = selectCurrentUserId(getState());
  const userId = 1;
  if (userId != null) {
    apiFetchTodos({type: ActionTypes.FETCH_TODO, userId: 1});
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

export const dbDisconnect = message => ({
  type: ActionTypes.DB_DISCONNECT,
  message
})