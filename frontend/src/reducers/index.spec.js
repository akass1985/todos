import * as reducers from './index'
import { ActionTypes } from '../actions'

describe('Редьюсеры', function() {

  const state = {
    todos: {
      loading: false,
      error: null,
      data: [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: '2019-12-30T19:00:00.000Z',
          created_date: '2019-11-03T19:00:00.000Z',
          modified_date: '2019-11-03T19:00:00.000Z',
          priority: 'высокий',
          status: 'выполнена',
          owner: 1,
          assigned_user: 1
        },
        {
          id: 2,
          title: 'Подготовиться к застолью',
          description: 'Купить хлеба и макарон',
          due_date: '2019-12-30T19:00:00.000Z',
          created_date: '2019-11-03T19:00:00.000Z',
          modified_date: '2019-11-03T19:00:00.000Z',
          priority: 'низкий',
          status: 'выполняется',
          owner: 1,
          assigned_user: 2
        }
      ]
    },
    users: {
      loading: false,
      error: null,
      data: [
        {
          id: 1,
          firstname: 'Алексей',
          middlename: 'Борисович',
          lastname: 'Кассь',
          chief: 0
        },
        {
          id: 2,
          firstname: 'Иван',
          middlename: 'Иванович',
          lastname: 'Иванов',
          chief: 1
        }
      ]
    },
    auth: {
      loading: false,
      error: null,
      userId: 1
    },
    visibilityFilter: 'SHOW_ALL',
    dialogVisibility: false,
    currentEditing: null,
    infoMessage: null
  };

  describe('todos', function() {

    it('SAVE_TODO', ()=> {
      const state = {
        todos: {}
      };
      const action = {
        type: ActionTypes.FETCH_TODO, 
        userId: 1
      };
      const model = {
        todos: {},
        loading: true
      };
      expect(reducers.todos(state, action)).toEqual(model);
    });

    it('FETCH_TODO', ()=> {
      const state = {
        todos: {}
      };
      const action = {
        type: ActionTypes.SAVE_TODO, 
        userId: 1
      };
      const model = {
        todos: {},
        loading: true
      };
      expect(reducers.todos(state, action)).toEqual(model);
    });

    it('SAVE_TODO_FAILURE', ()=> {
      const state = {
        todos: {}
      };
      const action = {
        type: ActionTypes.SAVE_TODO_FAILURE, 
        result: 'FAILURE',
        error: 'error'
      };
      const model = {
        todos: {},
        loading: false,
        error: 'error'
      };
      expect(reducers.todos(state, action)).toEqual(model);
    });

    it('FETCH_TODO_FAILURE', ()=> {
      const state = {
        todos: {}
      };
      const action = {
        type: ActionTypes.FETCH_TODO_FAILURE, 
        result: 'FAILURE',
        error: 'error'
      };
      const model = {
        todos: {},
        loading: false,
        error: 'error'
      };
      expect(reducers.todos(state, action)).toEqual(model);
    });

    it('SAVE_TODO_SUCCESS', ()=> {
      const state = {
        todos: {}
      };
      const action = {
        type: ActionTypes.SAVE_TODO_SUCCESS,
        result: 'SUCCESS',
        userId: 1
      };
      const model = {
        todos: {},
        loading: false,
        error: null
      };
      expect(reducers.todos(state, action)).toEqual(model);
    });

    it('FETCH_TODO_SUCCESS', ()=> {
      const state = {
        todos: {}
      };
      const action = {
        type: ActionTypes.FETCH_TODO_SUCCESS,
        data: [
          {
            id: 1,
            title: 'Тестовое задание',
            description: 'Сделать менеджер задач',
            due_date: '2019-12-30T19:00:00.000Z',
            created_date: '2019-11-03T19:00:00.000Z',
            modified_date: '2019-11-03T19:00:00.000Z',
            priority: 'высокий',
            status: 'выполнена',
            owner: 1,
            assigned_user: 1
          },
          {
            id: 2,
            title: 'Подготовиться к застолью',
            description: 'Купить хлеба и макарон',
            due_date: '2019-12-30T19:00:00.000Z',
            created_date: '2019-11-03T19:00:00.000Z',
            modified_date: '2019-11-03T19:00:00.000Z',
            priority: 'низкий',
            status: 'выполняется',
            owner: 1,
            assigned_user: 2
          }
        ]
      };
      const model = {
        data: [
          {
            id: 1,
            title: 'Тестовое задание',
            description: 'Сделать менеджер задач',
            due_date: '2019-12-30T19:00:00.000Z',
            created_date: '2019-11-03T19:00:00.000Z',
            modified_date: '2019-11-03T19:00:00.000Z',
            priority: 'высокий',
            status: 'выполнена',
            owner: 1,
            assigned_user: 1
          },
          {
            id: 2,
            title: 'Подготовиться к застолью',
            description: 'Купить хлеба и макарон',
            due_date: '2019-12-30T19:00:00.000Z',
            created_date: '2019-11-03T19:00:00.000Z',
            modified_date: '2019-11-03T19:00:00.000Z',
            priority: 'низкий',
            status: 'выполняется',
            owner: 1,
            assigned_user: 2
          }
        ],
        loading: false,
        error: null,
      };
      expect(reducers.todos(state,action)).toEqual(model);
    });

    it('DEFAULT', ()=> {
      const state = {
        todos: {}
      };
      const action = {
        type: "UNKNOWN", 
        userId: 1
      };
      const model = {
        todos: {},
      };
      expect(reducers.todos(state, action)).toEqual(model);
    });
  });

  describe('auth', function() {

    it('LOGIN', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.LOGIN,
        userId: 1
      };
      const model = {
        loading: true
      };
      expect(reducers.auth(state, action)).toEqual(model);
    });

    it('LOGIN_FAILURE', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.LOGIN_FAILURE,
        error: 'error'
      };
      const model = {
        loading: false,
        error: 'error',
        userId: null
      };
      expect(reducers.auth(state, action)).toEqual(model);
    });

    it('LOGIN_SUCCESSFUL', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.LOGIN_SUCCESSFUL,
        data: 1
      };
      const model = {
        loading: false,
        error: null,
        userId: 1
      };
      expect(reducers.auth(state, action)).toEqual(model);
    });

  });

  describe('USERS', function() {

    it('FETCH_USERS', ()=> {
      const state = {
        users: {}
      };
      const action = {
        type: ActionTypes.FETCH_USERS, 
      };
      const model = {
        users: {},
        loading: true
      };
      expect(reducers.users(state, action)).toEqual(model);
    });

    it('FETCH_USERS_FAILURE', ()=> {
      const state = {
        users: {}
      };
      const action = {
        type: ActionTypes.FETCH_USERS_FAILURE,
        error: 'error'
      };
      const model = {
        users: {},
        loading: false,
        error: 'error'
      };
      expect(reducers.users(state, action)).toEqual(model);
    });

    it('FETCH_USERS_SUCCESS', ()=> {
      const state = {
        users: {}
      };
      const action = {
        type: ActionTypes.FETCH_USERS_SUCCESS,
        data: [
          {
            id: 1,
            firstname: 'Алексей',
            middlename: 'Борисович',
            lastname: 'Кассь',
            chief: 0
          },
          {
            id: 2,
            firstname: 'Иван',
            middlename: 'Иванович',
            lastname: 'Иванов',
            chief: 1
          }
        ]
      };
      const model = {
          data: [
            {
              id: 1,
              firstname: 'Алексей',
              middlename: 'Борисович',
              lastname: 'Кассь',
              chief: 0
            },
            {
              id: 2,
              firstname: 'Иван',
              middlename: 'Иванович',
              lastname: 'Иванов',
              chief: 1
            }
          ],
          loading: false,
          error: null
        };
      expect(reducers.users(state, action)).toEqual(model);
    });

    it('DEFAULT', ()=> {
      const state = {
        users: {}
      };
      const action = {
        type: "UNKNOWN", 
      };
      const model = {
        users: {},
      };
      expect(reducers.todos(state, action)).toEqual(model);
    });

  });

  describe('VisibilityFilter', function() {

    it('SET_VISIBILITY_FILTER', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.SET_VISIBILITY_FILTER,
        filter: 'SHOW_ALL'
      };
      const model = 'SHOW_ALL';
      expect(reducers.visibilityFilter(state, action)).toEqual(model);
    });

    it('DEFAULT', ()=> {
      const state = {
      };
      const action = {
        type: "UNKNOWN", 
      };
      const model = {
      };
      expect(reducers.visibilityFilter(state, action)).toEqual(model);
    });

  });

  describe('dialogVisibility', function() {

    it('SET_DIALOG_VISIBILITY', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.SET_DIALOG_VISIBILITY,
        dialogVisibility: false
      };
      const model = false;
      expect(reducers.dialogVisibility(state, action)).toEqual(model);
    });

    it('EDIT_TODO', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.EDIT_TODO
      };
      const model = true;
      expect(reducers.dialogVisibility(state, action)).toEqual(model);
    });

    it('DEFAULT', ()=> {
      const state = {
      };
      const action = {
        type: "UNKNOWN", 
      };
      const model = {
      };
      expect(reducers.dialogVisibility(state, action)).toEqual(model);
    });

  });

  describe('currentEditing', function() {

    it('EDIT_TODO', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.EDIT_TODO,
        id: 1
      };
      const model = 1;
      expect(reducers.currentEditing(state, action)).toEqual(model);
    });

    it('SET_DIALOG_VISIBILITY', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.SET_DIALOG_VISIBILITY
      };
      const model = null;
      expect(reducers.currentEditing(state, action)).toEqual(model);
    });

    it('DEFAULT', ()=> {
      const state = {
      };
      const action = {
        type: "UNKNOWN", 
      };
      const model = {
      };
      expect(reducers.dialogVisibility(state, action)).toEqual(model);
    });

  });

  describe('infoMessage', function() {

    it('EDIT_TODO', ()=> {
      const state = {
      };
      const action = {
        type: ActionTypes.DB_DISCONNECT,
        message: 'message'
      };
      const model = 'message';
      expect(reducers.infoMessage(state, action)).toEqual(model);
    });

    it('DEFAULT', ()=> {
      const state = {
      };
      const action = {
        type: "UNKNOWN", 
      };
      const model = {
      };
      expect(reducers.infoMessage(state, action)).toEqual(model);
    });

  });

});