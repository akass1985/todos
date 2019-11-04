import * as selectors from './index'
import { addDays, addMonths } from 'date-fns'

describe('Селекторы', function() {

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
  }

  describe('getVisibleTodos', function() {

    const todos = [
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
        ];
    
    const users = [
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
    ];

    it('Задан фильтр «Без группировки»', ()=> {
      const model = [
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
      ];
      expect(selectors.getVisibleTodos(todos, users, 'SHOW_ALL')).toEqual(model);
    });

    it('Задан фильтр «По ответственным»', ()=> {
      const model = [
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
        },
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
        }
      ];
      expect(selectors.getVisibleTodos(todos, users, 'SHOW_BY_ASSIGNED_USERS')).toEqual(model);
    });

    it('Задан фильтр «По дате завершения» -> «На сегодня»', ()=> {
      const todos = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: new Date(),
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
      ];
      const model = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: new Date(),
          created_date: '2019-11-03T19:00:00.000Z',
          modified_date: '2019-11-03T19:00:00.000Z',
          priority: 'высокий',
          status: 'выполнена',
          owner: 1,
          assigned_user: 1
        }
      ];
      expect(selectors.getVisibleTodos(todos, users, 'SHOW_BY_DUE_DATE_ON_TODAY')).toEqual(model);
    });

    it('Задан фильтр «По дате завершения» -> «На неделю»', ()=> {
      const todos = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: addDays(new Date(), 3),
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
      ];
      const model = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: addDays(new Date(), 3),
          created_date: '2019-11-03T19:00:00.000Z',
          modified_date: '2019-11-03T19:00:00.000Z',
          priority: 'высокий',
          status: 'выполнена',
          owner: 1,
          assigned_user: 1
        }
      ];
      expect(selectors.getVisibleTodos(todos, users, 'SHOW_BY_DUE_DATE_ON_WEEK')).toEqual(model);
    });

    it('Задан фильтр «По дате завершения» -> «На месяц»', ()=> {
      const todos = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: addDays(new Date(), 15),
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
      ];
      const model = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: addDays(new Date(), 15),
          created_date: '2019-11-03T19:00:00.000Z',
          modified_date: '2019-11-03T19:00:00.000Z',
          priority: 'высокий',
          status: 'выполнена',
          owner: 1,
          assigned_user: 1
        }
      ];
      expect(selectors.getVisibleTodos(todos, users, 'SHOW_BY_DUE_DATE_ON_MONTH')).toEqual(model);
    });

    it('Задан фильтр «По дате завершения» -> «На полгода»', ()=> {
      const todos = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: addMonths(new Date(), 5),
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
      ];
      const model = [
        {
          id: 1,
          title: 'Тестовое задание',
          description: 'Сделать менеджер задач',
          due_date: addMonths(new Date(), 5),
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
      ];
      expect(selectors.getVisibleTodos(todos, users, 'SHOW_BY_DUE_DATE_ON_HALF_YEAR')).toEqual(model);
    });

    it('Задан неизвестный фильр', ()=> {
      const todos = [
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
      ];
      const model = [];
      expect(selectors.getVisibleTodos(todos, users, 'UNKNOWN_FILTER')).toEqual(model);
    });
  });

  // TODO selectTodos

  // TODO selectCurrentId

  //TODO selectDialogVisibility

  //TODO selectDialogInitialValues

  //TODO selectCurrentEditing

  //TODO selectInfoMessage

  //TODO selectVisibilityFilter

  //TODO selectUsers
  
  //TODO selectAuth
  
  describe('selectUserId', function() {
    it('Когда задан', ()=> {
      const state = {
        auth: {
          userId: 1
        }
      };
      expect(selectors.selectUserId(state)).toEqual(1);
    });
    it('Когда не задан', ()=> {
      const state = {
        auth: { }
      };
      expect(selectors.selectUserId(state)).toEqual(null);
    });
  });

  //TODO selectChiefId

  //TODO selectEmployees
});