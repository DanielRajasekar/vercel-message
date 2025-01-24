import React from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Container className='mx-3'>
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/messages">Messages</Nav.Link>
            </Nav>
            </Container>

        </Navbar>
    </div>
  )
}

export default NavigationBar