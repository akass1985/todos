import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'

import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

const TodoList = ({ todos, toggleTodo }) => (
    <div>
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
                      onClick={() => toggleTodo(todo.id)}
                    />
                )}
            </tbody>
    </Table>
    </div>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoList
