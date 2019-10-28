const  test_data = [
    { 
        id: 1, 
        title: "Задача 1",
        description: 'Первая задача',
        due_date: '2019-10-31',
        created_date: '2019-10-21',
        modified_date: '2019-10-15',
        priority: 2,
        status: 0,
        owner: 0,
        assigned_user: 1
    }, { 
        id: 1, 
        title: "Задача 1",
        description: 'Первая задача',
        due_date: '2019-10-31',
        created_date: '2019-10-21',
        modified_date: '2019-10-15',
        priority: 2,
        status: 0,
        owner: 0,
        assigned_user: 1
    }, { 
        id: 1, 
        title: "Задача 1",
        description: 'Первая задача',
        due_date: '2019-10-31',
        created_date: '2019-10-21',
        modified_date: '2019-10-15',
        priority: 2,
        status: 0,
        owner: 0,
        assigned_user: 1
    }, 
];

const apiFetchTodos  = () => {
    return new Promise((resolve, reject) => {
        resolve(test_data);
      })
}

export default apiFetchTodos;