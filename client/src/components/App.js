import React from 'react'
import AddTodo from '../containers/AddTodo'
// import VisibleTodoList from '../containers/VisibleTodoList'
import TodoList from '../components/TodoList'

const App = () => (
  <div>
    <TodoList />
    <AddTodo />
  </div>
)

export default App
