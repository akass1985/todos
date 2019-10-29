import { ActionTypes, VisibilityFilters } from '../actions'
import { combineReducers } from 'redux';
import  { format }  from 'date-fns'

const todos = (state = [], action) => {
  switch (action.type) {
      case ActionTypes.SAVE_TODO:	
        const existingTodoIdx = state.findIndex( t => t.id === action.item.id );
        let newState;
        if (existingTodoIdx > -1) {
          newState = [...state];
          newState[existingTodoIdx] = action.item
        } else {
          newState = state.concat([action.item]);
        }
        return newState;
      case ActionTypes.FETCH_TODO:
        return { ...state, loading: true};
      case ActionTypes.FETCH_TODO_FAILURE:
        return { ...state, loading: false, error: action.error };
      case ActionTypes.FETCH_TODO_SUCCESS:
        return { loading: false, error: null, data: action.data };
      default:
        return state;
  }
}

export const selectTodos = state => state.todos.data || [];
export const selectCurrentUserId = state => state.selectCurrentUserId || 1;

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case ActionTypes.SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const dialogVisibility = (state = false, action) => {
  switch (action.type) {
      case ActionTypes.SET_DIALOG_VISIBILITY:
          return action.dialogVisibility
      case ActionTypes.EDIT_TODO:
          return true
      default:
          return state
  }
}

export const selectDialogVisibility = state => state.dialogVisibility
export const selectDialogInitialValues = state => {
  if(state.currentEditing){
    return state.todos.data.find( t => t.id === state.currentEditing)
  } else {
    return {
      created_date: format(new Date(), 'yyyy-MM-dd')
    }
  }
}

const currentEditing = (state = null, action) => {
  switch (action.type){
        case ActionTypes.EDIT_TODO:
            return action.id
        default:
          return state
    }
}

const infoMessage = ( state = null, action) => {
    switch (action.type) {
      case ActionTypes.DB_DISCONNECT:
          return action.message
      default:
          return state
    }
}

export const selectInfoMessage = state => state.infoMessage

export default combineReducers({ 
  todos, 
  VisibilityFilters,
  dialogVisibility,
  currentEditing,
  infoMessage
});
