import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { login, ActionTypes } from '../actions'
import { selectAuth } from '../selectors'

const Auth = () => {

    const dispatch = useDispatch();

    let nodeLogin;
    let nodePassword;

    const [col1, col2] = [3, 7];

    const auth = useSelector(selectAuth);
    
    const onSubmit = () => { dispatch(login({
        login: nodeLogin.value.trim(),
        password: nodePassword.value.trim()
    }))}

    return (
        <Modal 
            size="sm"
            centered
            keyboard
            show={!auth.userId}>
            <Modal.Header>
                <Modal.Title>Вход в систему</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="show-grid">
                        <Col xs={col1} md={col1}>
                            <label>Логин</label>
                        </Col>
                        <Col xs={col2} md={col2}>
                            <input 
                                name="login"
                                ref={node => (nodeLogin = node)}
                                type="text"/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={col1} md={col1}>
                            <label>Пароль</label>    
                        </Col>
                        <Col xs={col2} md={col2}>
                            <input 
                                name="password"
                                ref={node => (nodePassword = node)}
                                type="password" />
                        </Col>
                    </Row>
                    {!auth.userId && !auth.loading && auth.error && <Row>
                        <Col>
                            <Alert variant="danger">{auth.error}</Alert>
                        </Col>
                    </Row>}
                </Container>
            </Modal.Body>
            <Modal.Footer>
            {auth.loading && 
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    Проверка...
                </Button>}
            {!auth.loading && 
                <Button 
                    onClick={ () => onSubmit() }
                    variant="primary">
                Log In
            </Button>}
            </Modal.Footer>
        </Modal>
    )
}

export default Auth;