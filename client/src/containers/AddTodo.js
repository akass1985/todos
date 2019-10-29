import React from 'react'
//import { render } from 'react-dom'
import { connect } from 'react-redux'
import { saveTodo, editTodo, showSaveDialog } from '../actions'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import { isAfter, isEqual, format }  from 'date-fns'

const AddTodo = ({ dispatch, visibility, initialValues = {} }) => {
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
        show={visibility}>
        <Modal.Header closeButton>
            <Modal.Title>Добавление задачи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form 
                onSubmit={ (values) => {
		    dispatch(saveTodo(values));
                    dispatch(showSaveDialog(false));
                }} 
                initialValues={initialValues} 
                render={( { handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>ID</label>
                            <Field
                                name="id"
                                component="input"
                                type="text"
                                placeholder="ID"
                            />
                        </div>
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
                                <option value="0">низкий</option>
                                <option value="1" selected>средний</option>
                                <option value="2">высокий</option>
                            </Field>
                        </div>
                        <div>
                            <label>Статус</label>
                            <Field name="status" component="select">
                                <option />
                                <option value="1">к выполнению</option>
                                <option value="2">выполняется</option>
                                <option value="3">выполнена</option>
                                <option value="0">отменена</option>
                            </Field>
                        </div>
                        <div>
                            <label>Создатель</label>
                            <Field name="owner" component="select">
                                <option />
                                <option value="1">Коля</option>
                                <option value="2">Петя</option>
                                <option value="3">Вася</option>
                                <option value="0">Махмуд</option>
                            </Field>
                        </div>
                        <div>
                            <label>Ответственный</label>
                            <Field name="assigned_user" component="select">
                                <option />
                                <option value="1">Коля</option>
                                <option value="2">Петя</option>
                                <option value="3">Вася</option>
                                <option value="0">Махмуд</option>
                            </Field>
                        </div>
                        <Button 
                            variant="secondary" 
                            onClick={() => {
				             dispatch(showSaveDialog(false));
			                   }
			    }>
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

const mapStateToProps = state => ({
  visibility: state.visibilityDialog,
  initialValues: state.todos.find( t => t.id === state.currentEditing )
})
    
export default connect(mapStateToProps)(AddTodo)
