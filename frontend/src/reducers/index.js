import { ActionTypes, VisibilityFilters } from '../actions'
import { combineReducers } from 'redux';

export const todos = (state = [], action) => {
  switch (action.type) {

      case ActionTypes.SAVE_TODO:
      case ActionTypes.FETCH_TODO:
        return { ...state, loading: true };

      case ActionTypes.SAVE_TODO_FAILURE:
      case ActionTypes.FETCH_TODO_FAILURE:
        return { ...state, loading: false, error: action.error };

      case ActionTypes.SAVE_TODO_SUCCESS:
        return { ...state, loading: false, error: null }
      case ActionTypes.FETCH_TODO_SUCCESS:
        return { loading: false, error: null, data: action.data };
      default:
        return state;
  }
}

export const auth = (state = [], action) => {
  switch (action.type){
    case ActionTypes.LOGIN:
      return { ...state, loading: true };
    case ActionTypes.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error, userId: null };
    case ActionTypes.LOGIN_SUCCESSFUL:
      return { ...state, loading: false, error: null, userId: action.data }
    default:
      return state
  }
}

export const users = ( state = [], action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return { ...state, loading: true };
    case ActionTypes.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return { loading: false, error: null, data: action.data }
    default:
      return state;
  }
}

export const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case ActionTypes.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export const dialogVisibility = (state = false, action) => {
  switch (action.type) {
      case ActionTypes.SET_DIALOG_VISIBILITY:
          return action.dialogVisibility
      case ActionTypes.EDIT_TODO:
          return true
      default:
          return state
  }
}

export const currentEditing = (state = null, action) => {
  switch (action.type){
        case ActionTypes.EDIT_TODO:
            return action.id
        case ActionTypes.SET_DIALOG_VISIBILITY:
            return null
        default:
          return state
    }
}

export const infoMessage = ( state = null, action) => {
    switch (action.type) {
      case ActionTypes.DB_DISCONNECT:
          return action.message
      default:
          return state
    }
}

export default combineReducers({ 
  todos, 
  users, 
  auth,
  visibilityFilter,
  dialogVisibility,
  currentEditing,
  infoMessage
});
