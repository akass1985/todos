import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import Todo from './Todo'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters, showSaveDialog, fetchTodo } from '../actions'
import { selectTodos } from '../reducers'

const TodoList = () => {

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(fetchTodo());
  }, []);

  const todos = useSelector(selectTodos);
  const data = todos.data ? todos.data : [];

  if (todos.loading) {
    return <div>loading</div>;
  }

  if (todos.error) {
    return <div>error: {todos.error.toString()}</div>;
  }

  return (
    <div>
      <h1>Задачи</h1>
      <Button
        variant="primary"
        onClick={ () => dispatch(showSaveDialog(true)) }>
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
                  {data.map(todo =>
                      <Todo
                        key={todo.id}
                        todo={todo}
                        // onClick={() => editTodo(todo.id)}
                      />
                  )}
              </tbody>
      </Table>
    </div>
  )
};

export default TodoList;