import React from 'react'
import PropTypes from 'prop-types'
import Nav from 'react-bootstrap/Nav'

const Link = ({ active, eventKey, children, onClick }) => (
    <Nav.Item>
        <Nav.Link
           onClick={onClick}
           disabled={active}
           eventKey={eventKey}
           style={{
               marginLeft: '4px',
           }}
        >
          {children}
        </Nav.Link>
    </Nav.Item>
)

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
