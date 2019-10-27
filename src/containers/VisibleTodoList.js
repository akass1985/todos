import { connect } from 'react-redux'
import { editTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters, fetchTodos } from '../actions'
import { getTodos } from '../reducers/todos';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(getTodos(), state.visibilityFilter),
  visibility: state.visibility
})

const mapDispatchToProps = dispatch => ({
  editTodo: id => dispatch(editTodo(id)),
  getTodos: id => dispatch(fetchTodos(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
