import apiFetchTodos, { apiSaveTodo, apiFetchUsers, apiLogin } from '../api'

export const ActionTypes = {
  SAVE_TODO: "SAVE_TODO",
  SAVE_TODO_SUCCESS: "SAVE_TODO_SUCCESS",
  SAVE_TODO_FAILURE: "SAVE_TODO_FAILURE",
  EDIT_TODO: "EDIT_TODO",
  SET_VISIBILITY_FILTER: "SET_VISIILITY_FILTER",
  SET_DIALOG_VISIBILITY: "SET_DIALOG_VISIBILITY",
  FETCH_TODO: "FETCH_TODO",
  FETCH_TODO_SUCCESS: "FETCH_TODO_SUCCESS",
  FETCH_TODO_FAILURE: "FETCH_TODO_FAILURE",
  FETCH_USERS: "FETCH_USERS",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE",
  DB_DISCONNECT: "DB_DISCONNECT",
  LOGIN: "LOGIN",
  LOGIN_SUCCESSFUL: "LOGIN_SUCCESSFUL",
  LOGIN_FAILURE: "LOGIN_FAILURE"
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_BY_DUE_DATE_ON_TODAY: 'SHOW_BY_DUE_DATE_ON_TODAY',
  SHOW_BY_DUE_DATE_ON_WEEK: 'SHOW_BY_DUE_DATE_ON_WEEK',
  SHOW_BY_DUE_DATE_ON_MONTH: 'SHOW_BY_DUE_DATE_ON_MONTH',
  SHOW_BY_DUE_DATE_ON_HALF_YEAR: 'SHOW_BY_DUE_DATE_ON_HALF_YEAR',
  SHOW_BY_ASSIGNED_USERS: 'SHOW_BY_ASSIGNED_USERS'
}

// LOGIN
export const login = (credentials) => (dispatch, getState) => {
  apiLogin({
    type: ActionTypes.LOGIN,
    credentials: credentials
  })
}

export const loginSuccessful = data => ({
  type: ActionTypes.LOGIN_SUCCESSFUL,
  data
})

export const loginFailure = error => ({
  type: ActionTypes.LOGIN_FAILURE,
  error
})
// T O D O S
export const fetchTodo = userId => (dispatch, getState) => {
  if (userId != null) {
    apiFetchTodos({
      type: ActionTypes.FETCH_TODO, 
      userId: userId});
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
// SAVE TODO
export const saveTodo = (item, userId) => (dispatch, getState) => (
  apiSaveTodo({
    type: ActionTypes.SAVE_TODO,
    item: item,
    userId: userId
  })
)

export const saveTodoSuccess = data => ({
  type: ActionTypes.SAVE_TODO_SUCCESS,
  data
})

export const saveTodoFailure = error => ({
  type: ActionTypes.SAVE_TODO_FAILURE,
  error
})
// EDIT TODO
export const editTodo = id => ({
  type: ActionTypes.EDIT_TODO,
  id
})
// DIALOG VISIBILITY
export const setVisibilityFilter = filter => ({
  type: ActionTypes.SET_VISIBILITY_FILTER,
  filter
})

export const setDialogVisibilityAction = dialogVisibility => ({
    type: ActionTypes.SET_DIALOG_VISIBILITY,
    dialogVisibility
})
// USERS
export const fetchUsers = () => (dispatch, getState) => {
  apiFetchUsers({
    type: ActionTypes.FETCH_USERS, 
    filter: "ALL"});
}

export const fetchUsersSuccess = data => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  data
})

export const fetchUsersFailure = error => ({
  type: ActionTypes.FETCH_USERS_FAILURE,
  error
})
// ERRORS
export const dbDisconnect = message => ({
  type: ActionTypes.DB_DISCONNECT,
  message
})