import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectUsers } from '../selectors'
import { format, isAfter } from 'date-fns'

const Todo = ({ onClick, completed, todo }) => {

  const users = useSelector(selectUsers);

  const getAssignedUser = id => {
    const user = users.find( user => user.id === id );
    return user ? `${user.lastname} ${user.firstname} ${user.middlename}` : "";
  }

  return (
    <tr
      onClick={onClick}
    >
      <td style={{color: todo.status === "выполнена" ? "green" : ( isAfter(new Date(), new Date(todo.due_date)) ? "red" : "grey") }}>{todo.title}</td>
      <td>{todo.priority}</td>
      <td>{format(new Date(todo.due_date), "dd-MM-yyyy")}</td>
      <td>{getAssignedUser(todo.assigned_user)}</td>
      <td>{todo.status}</td>
    </tr>
  );
}

export default Todo
