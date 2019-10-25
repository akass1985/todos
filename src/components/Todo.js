import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, todo }) => (
  <tr
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    <td>{todo.title}</td>
    <td>{todo.priority}</td>
    <td>{todo.due_date}</td>
    <td>{todo.assigned_user}</td>
    <td>{todo.status}</td>
  </tr>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default Todo
