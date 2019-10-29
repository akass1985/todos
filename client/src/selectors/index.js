import  { format }  from 'date-fns'
import { VisibilityFilters } from '../actions'

export const sortByAssignedUsers = function(todos){
  
}

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_BY_ASSIGNED_USERS:
      return [...todos].sort( (a, b) => a.assigned_user < b.assigned_user ? -1 : 1 )
    case VisibilityFilters.SHOW_BY_DUE_DATE:
        return [...todos].sort( (a, b) => a.due_date > b.due_date ? -1 : 1)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

export const selectTodos = state => getVisibleTodos(
  state.todos.data || [],
  selectVisibilityFilter(state)
)

// export const selectTodos = state => state.todos.data || [],
//   selectVisibilityFilter(state)
// )

export const selectCurrentUserId = state => state.currentUserId || 1;

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

export const selectCurrentEditing = state => state.currentEditing || null

export const selectInfoMessage = state => state.infoMessage

export const selectVisibilityFilter = state => state.visivilityFilter || VisibilityFilters.SHOW_ALL