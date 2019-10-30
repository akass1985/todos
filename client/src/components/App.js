import React from 'react'
import AddTodo from '../containers/AddTodo'
import Auth from '../components/Auth'
import TodoList from '../components/TodoList'

const App = () => (
  <div>
    <TodoList />
    <Auth />
    <AddTodo />
  </div>
)

export default App
