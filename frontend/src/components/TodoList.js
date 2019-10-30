import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import Todo from './Todo'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Alert from 'react-bootstrap/Alert'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters, setDialogVisibilityAction, fetchTodo, editTodo } from '../actions'
import { selectTodos, selectDialogVisibility, selectInfoMessage, selectVisibilityFilter, selectAuth } from '../selectors'
import Spinner from 'react-bootstrap/Spinner'
import { todos } from '../reducers';
import { setVisibilityFilter } from '../actions'

const TodoList = () => {

  const dispatch = useDispatch();

  // useEffect( () => {
  //   dispatch(fetchTodo());
  // }, []);

  const todos = useSelector(selectTodos);
  // const dialogVisibility =  useSelector(selectDialogVisibility);
  const infoMessage = useSelector(selectInfoMessage);
  const isAuth = useSelector(selectAuth);

  // if (isAuth){
  //   dispatch(fetchTodo());
  // }

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
              Без группировки
          </FilterLink>
          <NavDropdown title="По дате завершения" id="SHOW_BY_DUE_DATE">
            <NavDropdown.Item 
              eventKey={VisibilityFilters.SHOW_BY_DUE_DATE_ON_TODAY} 
              onClick={ () => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_BY_DUE_DATE_ON_TODAY))}>
                На сегодня
            </NavDropdown.Item>

            <NavDropdown.Divider />
            
            <NavDropdown.Item 
              eventKey={VisibilityFilters.SHOW_BY_DUE_DATE_ON_WEEK} 
              onClick={ () => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_BY_DUE_DATE_ON_WEEK))}>
                На неделю
            </NavDropdown.Item>
            <NavDropdown.Item 
              eventKey={VisibilityFilters.SHOW_BY_DUE_DATE_ON_MONTH} 
              onClick={ () => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_BY_DUE_DATE_ON_MONTH))}>
                На месяц
            </NavDropdown.Item>
            <NavDropdown.Item 
              eventKey={VisibilityFilters.SHOW_BY_DUE_DATE_ON_HALF_YEAR} 
              onClick={ () => dispatch(setVisibilityFilter(VisibilityFilters.SHOW_BY_DUE_DATE_ON_HALF_YEAR))}>
                На полгода
            </NavDropdown.Item>
          </NavDropdown>
          <FilterLink filter={VisibilityFilters.SHOW_BY_ASSIGNED_USERS}>
              По ответственным
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