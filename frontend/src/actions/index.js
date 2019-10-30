import apiFetchTodos, { apiSaveTodo, apiFetchUsers, apiLogin } from '../api'
import { selectCurrentUserId } from '../selectors'

export const ActionTypes = {
  SAVE_TODO: "SAVE_TODO",
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

export const saveTodo = item => (dispatch, getState) => (
  apiSaveTodo({
    type: ActionTypes.SAVE_TODO,
    item: item
  })
)

export const editTodo = id => ({
  type: ActionTypes.EDIT_TODO,
  id
})

export const setVisibilityFilter = filter => ({
  type: ActionTypes.SET_VISIBILITY_FILTER,
  filter
})

export const setDialogVisibilityAction = dialogVisibility => ({
    type: ActionTypes.SET_DIALOG_VISIBILITY,
    dialogVisibility
})

export const fetchTodo = () => (dispatch, getState) => {
  const userId = selectCurrentUserId(getState());
  if (userId != null) {
    apiFetchTodos({
      type: ActionTypes.FETCH_TODO, 
      userId: userId});
  }
}

export const fetchUsers = () => (dispatch, getState) => {
  apiFetchUsers({
    type: ActionTypes.FETCH_USERS, 
    filter: "ALL"});
}

export const fetchTodoSuccess = data => ({
  type: ActionTypes.FETCH_TODO_SUCCESS,
  data
})

export const fetchUsersSuccess = data => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  data
})

export const fetchTodoFailure = error => ({
  type: ActionTypes.FETCH_TODO_FAILURE,
  error
})

export const fetchUsersFailure = error => ({
  type: ActionTypes.FETCH_USERS_FAILURE,
  error
})

export const dbDisconnect = message => ({
  type: ActionTypes.DB_DISCONNECT,
  message
})

// export const login = credentials => ({
//   type: ActionTypes.GET_AUTH,
//   credentials
// })

export const loginSuccessful = data => ({
  type: ActionTypes.LOGIN_SUCCESSFUL,
  data
})

export const loginFailure = error => ({
  type: ActionTypes.LOGIN_FAILURE,
  error
})

export const login = (credentials) => (dispatch, getState) => {
    apiLogin({
      type: ActionTypes.LOGIN,
      credentials: credentials
    })
}