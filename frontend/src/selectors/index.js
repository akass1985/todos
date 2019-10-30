import  { format, addWeeks, addMonths, isAfter, isBefore, isEqual }  from 'date-fns'
import { VisibilityFilters } from '../actions'

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return [...todos].sort( (a,b) => isBefore(new Date(a.modified_date), new Date(b.modified_date)) ? -1 : 1 )
    case VisibilityFilters.SHOW_BY_ASSIGNED_USERS:
      return [...todos].sort( (a, b) => a.assigned_user < b.assigned_user ? -1 : 1 )
    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_TODAY:
        return todos.filter( todo => isEqual(new Date(todo.due_date), new Date()))
    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_WEEK:
      return todos.filter( todo => 
        isAfter(new Date(todo.due_date), new Date()) && isBefore(new Date(), addWeeks(new Date(), 1))
      )
    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_MONTH:
        return todos.filter( todo => 
          isAfter(new Date(todo.due_date), new Date()) && isBefore(new Date(), addMonths(new Date(), 1))
        )
    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_HALF_YEAR:
        return todos.filter( todo => 
          isAfter(new Date(todo.due_date), new Date()) && isBefore(new Date(), addMonths(new Date(), 6))
        )
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

export const selectTodos = state => getVisibleTodos(
  (state.auth.userId && state.todos.data) || [],
  selectVisibilityFilter(state)
)

// export const selectTodos = state => {
//   if (!state.auth.loading && !state.auth.error && state.auth.userId 
//         && state.todos.data){
//           return getVisibleTodos(
//             state.todos.data,
//             selectVisibilityFilter(state))
//           } else {
//             return [];
//           }
//   }

// export const selectTodos = state => state.todos.data || [],
//   selectVisibilityFilter(state)
// )

export const selectCurrentUserId = state => state.currentUserId || 1;

export const selectDialogVisibility = state => state.dialogVisibility

export const selectDialogInitialValues = state => {
  if(state.currentEditing){
    const currentTodo = state.todos.data.find( t => t.id === state.currentEditing);
    return currentTodo;
    // return Object.assign(
    //   {},
    //   currentTodo,
    //   {
    //     due_date: format(currentTodo.due_date, 'yyyy-MM-dd'),
    //     created_date: format(currentTodo.created_date, 'yyyy-MM-dd'),
    //     modified_date: format(currentTodo.modified_date, 'yyyy-MM-dd')
    //   }
    // )
  } else {
    return {
      created_date: format(new Date(), 'yyyy-MM-dd')
    }
  }
}

export const selectCurrentEditing = state => state.currentEditing || null

export const selectInfoMessage = state => state.infoMessage

export const selectVisibilityFilter = state => state.visibilityFilter || VisibilityFilters.SHOW_ALL

export const selectUsers = state => state.users.data || [];

export const selectAuth = state => state.auth.userId || null;