import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { login } from '../actions'

const Auth = () => {

    const dispatch = useDispatch();

    return (
        <Modal 
            size="sm"
            centered
            keyboard
            show={true}>
            <Modal.Header>
                <Modal.Title>Ты хто?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form 
                        onSubmit={ (values) => 
                            dispatch(login(values)).then(
                                {}, 
                                {}) } 
                        initialValues={{ login: "alexeykass", password: "alexeykass" }} 
                        render={( { handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Row className="show-grid">
                                        <Col xs={3} md={3}>
                                            <label>Логин</label>
                                        </Col>
                                        <Col xs={7} md={7}>
                                            <Field
                                            name="login"
                                            component="input"
                                            type="text" /> 
                                        </Col>
                                    </Row>

                                    <Row className="show-grid">
                                        <Col xs={3} md={3}>
                                            <label>Пароль</label>    
                                        </Col>
                                        <Col xs={7} md={7}>
                                            <Field
                                                name="password"
                                                component="input"
                                                type="password" />    
                                        </Col>
                                        <Button 
                variant="secondary" 
                // onClick={ () => dispatch(setDialogVisibilityAction(false))}
                >
                Закрыть
            </Button>
            <Button 
                type="submit" variant="primary">
                Log In
            </Button>
                                    </Row>
                                </div>
                                <div>
                                    <pre>
                                        {JSON.stringify(values)}
                                    </pre>
                                </div>
                            </form>
                        )} 
                    />
                </Container>
            </Modal.Body>
            <Modal.Footer>
            
            </Modal.Footer>
        </Modal>
    )
}

export default Auth;