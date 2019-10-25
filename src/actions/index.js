let nextTodoId = 0
export const addTodo = ( values ) => ({
  type: 'ADD_TODO',
  item: values
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const setVisibilityDialog = visibility => ({
    type: 'SET_VISIBILITY_DIALOG',
    visibility
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
