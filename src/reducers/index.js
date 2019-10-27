import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import visibilityDialog from './dialog'
import currentEditing from './currentEditing'

export default combineReducers({
  todos,
  visibilityFilter,
  visibilityDialog,
  currentEditing
})
