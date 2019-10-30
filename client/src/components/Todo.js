import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../selectors'

const Todo = ({ onClick, completed, todo }) => {

  const users = useSelector(selectUsers);

  const getAssignedUser = id => {
    const user = users.find( user => user.id === id );
    return user ? `${user.firstname} ${user.middlename} ${user.lastname}` : "";
  }

  return (
    <tr
      onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
      <td>{todo.title}</td>
      <td>{todo.priority}</td>
      <td>{todo.due_date}</td>
      <td>{getAssignedUser(todo.assigned_user)}</td>
      <td>{todo.status}</td>
    </tr>
  );
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default Todo
