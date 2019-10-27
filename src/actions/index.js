export const saveTodo = ( values ) => ({
  type: 'SAVE_TODO',
  item: values
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const showSaveDialog = visibility => ({
    type: 'SET_VISIBILITY_DIALOG',
    visibility
})

export const editTodo = id => ({
  type: 'EDIT_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const fetchTodos = id => ({
  type: 'FETCH_TODOS',
  id
})
