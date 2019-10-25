import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import visibilityDialog from './dialog'

export default combineReducers({
  todos,
  visibilityFilter,
  visibilityDialog
})
