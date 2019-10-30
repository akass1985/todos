import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../selectors'
import { formatRelative, isAfter } from 'date-fns'
import { ru } from 'date-fns/locale'

const Todo = ({ onClick, completed, todo }) => {

  const users = useSelector(selectUsers);

  const getAssignedUser = id => {
    const user = users.find( user => user.id === id );
    return user ? `${user.firstname} ${user.middlename} ${user.lastname}` : "";
  }

  return (
    <tr
      onClick={onClick}
    >
      <td style={{color: todo.status === "выполнена" ? "green" : ( isAfter(new Date(), new Date(todo.due_date)) ? "red" : "grey") }}>{todo.title}</td>
      <td>{todo.priority}</td>
      <td>{formatRelative(new Date(todo.due_date), new Date(), {locale: ru, weekStartsOn: 1 })}</td>
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
