import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import Todo from './Todo'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters, setDialogVisibilityAction, fetchTodo, editTodo } from '../actions'
import { selectTodos, selectDialogVisibility, selectInfoMessage } from '../reducers'
import Spinner from 'react-bootstrap/Spinner'

const TodoList = () => {

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(fetchTodo());
  }, []);

  const todos = useSelector(selectTodos);
  const dialogVisibility =  useSelector(selectDialogVisibility);
  const infoMessage = useSelector(selectInfoMessage);

  if (infoMessage){
    return (
      <Alert key="0" variant="warning">
          {infoMessage}
      </Alert>    
    )
  }

  if (todos.loading) {
    return <div><Spinner /></div>;
  }

  if (todos.error){
    return (
      <Alert key="0" variant="warning">
          {todos.error.toString()}
      </Alert>    
    )
  }

  return (
    <div>
      <h1>Задачи</h1>
      <Button
        variant="primary"
        onClick={ () => dispatch(setDialogVisibilityAction(true)) }>
        Добавить задачу
      </Button>
      <Nav variant="pills" defaultActiveKey={VisibilityFilters.SHOW_ALL}>
          <FilterLink filter={VisibilityFilters.SHOW_ALL}>
              Все
          </FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
              Активные
          </FilterLink>
          <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
              Завершённые
          </FilterLink>
      </Nav>
      <Table striped bordered hover size="sm">
          <thead>
                <tr>
                  <th scope="col">Заголовок</th>
                  <th scope="col">Приоритет</th>
                  <th scope="col">Дата окончания</th>
                  <th scope="col">Ответственный</th>
                  <th scope="col">Статус</th>
                </tr>
              </thead>
              <tbody>
                  {todos.map(todo =>
                      <Todo
                        key={todo.id}
                        todo={todo}
                        onClick={ () => dispatch(editTodo(todo.id)) }
                      />
                  )}
              </tbody>
      </Table>
    </div>
  )
};

export default TodoList;