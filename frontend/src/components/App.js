import React from 'react'
import AddTodo from '../containers/AddTodo'
import Auth from './Auth'
import TodoList from './TodoList'

const App = () => (
  <div>
    <TodoList />
    <Auth />
    <AddTodo />
  </div>
)

export default App
