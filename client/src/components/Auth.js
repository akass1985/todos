import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveTodo, editTodo, setDialogVisibilityAction } from '../actions'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { isAfter, isEqual }  from 'date-fns'
import { 
    selectDialogVisibility, 
    selectDialogInitialValues, 
    selectCurrentEditing, 
    selectUsers 
} from '../selectors'
import { fetchUsers } from '../actions'

const Auth = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchUsers());
      }, []);

    const dialogVisibility = useSelector(selectDialogVisibility);
    const dialogInitialValues = useSelector(selectDialogInitialValues);
    const currentEditing = useSelector(selectCurrentEditing);
    const users = useSelector(selectUsers);

    let values
  
    const validateDates = (value, values) => {
        var d1 = new Date(value), 
            d2 = new Date(values.created_date);
        if (!(isAfter(d1, d2) || isEqual(d1, d2))){
            return "Дата окончания не может быть раньше даты создания";
        }
    }

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
                    

                    
                </Container>
                <Form 
                    onSubmit={ (values) => {
                        dispatch(saveTodo(values));
                        dispatch(setDialogVisibilityAction(false));
                    }} 
                    initialValues={{}} 
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
                                </Row>
                            </div>
                        </form>
                    )} 
                />
            </Modal.Body>
            <Modal.Footer>
            <Button 
                variant="secondary" 
                onClick={ () => dispatch(setDialogVisibilityAction(false))}>
                Закрыть
            </Button>
            <Button 
                type="submit" variant="primary">
                Log In
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

// const mapStateToProps = state => ({
//   visibility: state.visibilityDialog,
//   initialValues: state.todos.find( t => t.id === state.currentEditing )
// })
    
// export default connect(mapStateToProps)(AddTodo)
export default Auth;