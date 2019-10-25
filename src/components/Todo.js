import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, todo }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {JSON.stringify(todo)}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default Todo
