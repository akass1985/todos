import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/Nav'
import { setVisibilityFilter } from '../actions'
import { useDispatch } from 'react-redux'

const FilterLink = ({filter, children}) => {

  const dispatch = useDispatch();

  return (
    <Nav.Item>
        <Nav.Link
           onClick={ () => dispatch(setVisibilityFilter(filter))}
           eventKey={filter}
           style={{
               marginLeft: '4px',
           }}
        >
          {children}
        </Nav.Link>
    </Nav.Item>
  )
}

// Link.propTypes = {
//   active: PropTypes.bool.isRequired,
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func.isRequired
// }

export default FilterLink
