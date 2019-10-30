import React, { useEffect, useState } from 'react'
//import { render } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { connect } from 'react-redux'
import { saveTodo, editTodo, setDialogVisibilityAction } from '../actions'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { isAfter, isEqual }  from 'date-fns'
import { selectDialogVisibility, selectDialogInitialValues, selectCurrentEditing } from '../selectors'
import { fetchUsers } from '../actions'

const AddTodo = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchUsers());
      }, []);

    const dialogVisibility = useSelector(selectDialogVisibility);
    const dialogInitialValues = useSelector(selectDialogInitialValues);
    const currentEditing = useSelector(selectCurrentEditing);

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
                <Form 
                    onSubmit={ (values) => {
                        dispatch(saveTodo(values));
                        dispatch(setDialogVisibilityAction(false));
                    }} 
                    initialValues={dialogInitialValues} 
                    render={( { handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            {/* <div>
                                <label>ID</label>
                                <Field
                                    name="id"
                                    component="input"
                                    type="text"
                                    placeholder="ID"
                                />
                            </div> */}
                            <div>
                                <label>Заголовок</label>
                                <Field
                                    name="title"
                                    component="input"
                                    type="text"
                                    placeholder="Название задачи"
                                />
                            </div>
                            <div>
                                <label>Описание</label>
                                <Field name="description" component="textarea" placeholder="Опишите здесь суть задачи" />
                            </div>
                            <div>
                                <Field
                                    name="due_date"
                                    component="input"
                                    type="date"
                                    validate={validateDates}>
                                    {({ input, meta }) => (
                                    <div>
                                        <label>Дата окончания</label>
                                        <input {...input} type="date" placeholder="Дата окончания" />
                                        {meta.validating && <Spinner />}
                                    </div>
                                )}
                                </Field>
                            </div>
                            <div>
                                <label>Дата создания</label>
                                <Field
                                    name="created_date"
                                    component="input"
                                    type="date"
                                />
                            </div>
                            <div>
                                <label>Дата обновления</label>
                                <Field
                                    name="modified_date"
                                    component="input"
                                    type="date"
                                    readonly="true"
                                />
                            </div>
                            <div>
                                <label>Приоритет</label>
                                <Field name="priority" component="select">
                                    <option />
                                    <option value="низкий">низкий</option>
                                    <option value="средний" selected>средний</option>
                                    <option value="высокий">высокий</option>
                                </Field>
                            </div>
                            <div>
                                <label>Статус</label>
                                <Field name="status" component="select">
                                    <option />
                                    <option value="к выполнению">к выполнению</option>
                                    <option value="выполняется">выполняется</option>
                                    <option value="выполнена">выполнена</option>
                                    <option value="отменена">отменена</option>
                                </Field>
                            </div>
                            <div>
                                <label>Создатель</label>
                                <Field name="owner" component="select">
                                    <option />
                                    <option value="1">Лёха</option>
                                    <option value="2">Ванька</option>
                                </Field>
                            </div>
                            <div>
                                <label>Ответственный</label>
                                <Field name="assigned_user" component="select">
                                    <option />
                                    <option value="1">Лёха</option>
                                    <option value="2">Ванька</option>
                                </Field>
                            </div>
                            <Button 
                                variant="secondary" 
                                onClick={ () => dispatch(setDialogVisibilityAction(false))}>
                                Закрыть
                            </Button>
                            <Button 
                                type="submit" variant="primary">
                                Сохранить
                            </Button>
                        </form>
                    )} 
                />
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