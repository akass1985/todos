import  { format, addWeeks, addMonths, isBefore, isSameDay, startOfDay }  from 'date-fns'
import { VisibilityFilters } from '../actions'
import { useSelector } from 'react-redux'

export const getVisibleTodos = (todos, users, filter) => {
  const today = startOfDay(new Date());

  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
        return [...todos].sort( (a,b) => isBefore(new Date(a.modified_date), new Date(b.modified_date)) ? 1 : -1 )

    case VisibilityFilters.SHOW_BY_ASSIGNED_USERS:
        return [...todos].sort( (a, b) => {
          const u_a = users.find( user => user.id === a.assigned_user);
          const u_b = users.find( user => user.id === b.assigned_user);
          if (u_a && u_b){
            if (u_a.lastname+u_a.firstname+u_a.middlename < u_b.lastname+u_b.firstname+u_b.middlename) {
              return -1;
            } else {
              return 1;
            }
          } else {
            return 0;
          }
        }
        );

    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_TODAY:
        return todos.filter( todo => isSameDay(new Date(todo.due_date), today))

    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_WEEK:
      return todos.filter( todo => {
        const due_date = new Date(todo.due_date);
        return !isBefore(due_date, today) && isBefore(due_date, addWeeks(today, 1));
      })

    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_MONTH:
        return todos.filter( todo => {
          const due_date = new Date(todo.due_date);
          return !isBefore(due_date, today) && isBefore(due_date, addMonths(today, 1));
        })

    case VisibilityFilters.SHOW_BY_DUE_DATE_ON_HALF_YEAR:
        return todos.filter( todo => {
          const due_date = new Date(todo.due_date);
          return !isBefore(due_date, today) && isBefore(due_date, addMonths(today, 6));
        })

    default:{
      try {
        throw new Error('Unknown filter: ' + filter);
        return [];
      } catch (e){
        return [];
      }
    }
  }
}

export const selectTodos = state => getVisibleTodos(
  state.todos.data || [],
  state.users.data || [],
  selectVisibilityFilter(state)
)

export const selectDialogVisibility = state => state.dialogVisibility || false;

export const selectDialogInitialValues = state => {
  if(state.currentEditing){
    const currentTodo = state.todos.data.find( t => t.id === state.currentEditing);
    return {...currentTodo,
      due_date: format(new Date(currentTodo.due_date), 'yyyy-MM-dd'),
      created_date: format(new Date(currentTodo.created_date), 'yyyy-MM-dd'),
      modified_date: format(new Date(currentTodo.modified_date), 'yyyy-MM-dd')
    };
  } else {
    return {
      created_date: format(new Date(), 'yyyy-MM-dd'),
      modified_date: format(new Date(), 'yyyy-MM-dd'),
      status: "к выполнению",
      owner: state.auth.userId,
      assigned_user: state.auth.userId
    }
  }
}

export const selectCurrentEditing = state => state.currentEditing || null

export const selectInfoMessage = state => state.infoMessage

export const selectVisibilityFilter = state => state.visibilityFilter || VisibilityFilters.SHOW_ALL

export const selectUsers = state => state.users.data || [];

export const selectAuth = state => state.auth || null;

export const selectUserId = state => state.auth.userId || null;

export const selectChiefId = state => {
  if (state.users.data && state.auth.userId){
    const me = state.users.data.find( user => user.id === state.auth.userId );
    return me ? me.chief : null;
  } else {
    return null;
  }
}

export const selectEmployees = state => {
  if (state.auth.userId && state.users.data) {
    return state.users.data.filter(  user => 
      (user.chief === state.auth.userId) || (user.id === state.auth.userId ) ) 
  } else {
    return [];
  }
}