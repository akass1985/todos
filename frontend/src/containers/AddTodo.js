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
    selectUsers, 
    selectUserId
} from '../selectors'
import { fetchUsers } from '../actions'

const AddTodo = () => {

    const dispatch = useDispatch();

    const [col1, col2] = [5, 7];

    // useEffect( () => {
    //     dispatch(fetchUsers());
    //   }, []);

    const dialogVisibility = useSelector(selectDialogVisibility);
    const dialogInitialValues = useSelector(selectDialogInitialValues);
    const currentEditing = useSelector(selectCurrentEditing);
    const users = useSelector(selectUsers);
    const userId = useSelector(selectUserId);

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
            size="lg"
            centered
            show={dialogVisibility}>
            <Modal.Header>
                <Modal.Title>{currentEditing ? 'Редактирование' : 'Добавление' } задачи</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form 
                        onSubmit={ (values) => {
                            dispatch(saveTodo(values, userId));
                            dispatch(setDialogVisibilityAction(false));
                        }} 
                        initialValues={dialogInitialValues} 
                        render={( { handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={col1} md={col1}>
                                        <label>Заголовок</label>
                                    </Col>
                                    <Col xs={col2} md={col2}>
                                        <Field
                                            name="title"
                                            component="input"
                                            type="text"
                                            placeholder="Название задачи"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Описание</label></Col>
                                    <Col xs={col2} md={col2}><Field name="description" component="textarea" placeholder="Опишите здесь суть задачи" rows="3"/></Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Дата окончания</label></Col>
                                    <Col xs={col2} md={col2}>
                                    <Field
                                        name="due_date"
                                        component="input"
                                        type="date"
                                        validate={validateDates}>
                                        {({ input, meta }) => (
                                        <div>
                                            <input {...input} type="date" placeholder="Дата окончания" />
                                            {meta.validating && <Spinner />}
                                        </div>
                                    )}
                                    </Field>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Дата создания</label></Col>
                                    <Col xs={col2} md={col2}>
                                    <Field
                                        name="created_date"
                                        component="input"
                                        type="date"
                                    />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Дата обновления</label></Col>
                                    <Col xs={col2} md={col2}><label>{dialogInitialValues.modified_date}</label></Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Приоритет</label></Col>
                                    <Col xs={col2} md={col2}>
                                    <Field name="priority" component="select">
                                        <option />
                                        <option value="низкий">низкий</option>
                                        <option value="средний" selected>средний</option>
                                        <option value="высокий">высокий</option>
                                    </Field>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Статус</label></Col>
                                    <Col xs={col2} md={col2}>
                                    <Field name="status" component="select">
                                        <option />
                                        <option value="к выполнению">к выполнению</option>
                                        <option value="выполняется">выполняется</option>
                                        <option value="выполнена">выполнена</option>
                                        <option value="отменена">отменена</option>
                                    </Field>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Создатель</label></Col>
                                    <Col xs={col2} md={col2}>
                                    <Field name="owner" component="select">
                                        <option />
                                        {users.map( user => <option value={user.id}>
                                            {user.firstname} {user.middlename} {user.lastname}
                                        </option>)}
                                    </Field>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={col1} md={col1}><label>Ответственный</label></Col>
                                    <Col xs={col2} md={col2}>
                                    <Field name="assigned_user" component="select">
                                        <option />
                                        {users.map( user => <option value={user.id}>
                                            {user.firstname} {user.middlename} {user.lastname}
                                        </option>)}
                                    </Field>
                                    </Col>
                                </Row>
                                <div class="modal-footer">
                                    <Button 
                                        variant="secondary" 
                                        onClick={ () => dispatch(setDialogVisibilityAction(false))}>
                                        Закрыть
                                    </Button>
                                    <Button 
                                        type="submit" variant="primary">
                                        Сохранить
                                    </Button>
                                </div>
                            </form>
                        )} 
                    />
                </Container>
            </Modal.Body>
        </Modal>
    )
}

// const mapStateToProps = state => ({
//   visibility: state.visibilityDialog,
//   initialValues: state.todos.find( t => t.id === state.currentEditing )
// })
    
// export default connect(mapStateToProps)(AddTodo)
export default AddTodo;