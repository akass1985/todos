CREATE TABLE users(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    middlename VARCHAR(30) NOT NULL,
    login VARCHAR(30) UNIQUE,
    password VARCHAR(30) NOT NULL,
    chief INT DEFAULT 0
);

INSERT INTO users(firstname, lastname, middlename, login, password, chief) 
    VALUES('Алексей', 'Кассь', 'Борисович', 'alexeykass', 'alexeykass', 0);

INSERT INTO users(firstname, lastname, middlename, login,  password, chief) 
    VALUES('Иван', 'Иванов', 'Иванович', 'i.i.ivanov', 'ivanov', 1);

CREATE TABLE todos(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    created_date DATE NOT NULL,
    modified_date DATE NOT NULL,
    priority VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    owner INT UNSIGNED NOT NULL,
    assigned_user INT UNSIGNED NOT NULL,
    FOREIGN KEY (owner) REFERENCES users(id),
    FOREIGN KEY (assigned_user) REFERENCES users(id)
);

INSERT INTO todos(
    title,
    description,
    due_date,
    created_date,
    modified_date,
    priority,
    status,
    owner,
    assigned_user
) VALUES (
    'Тестовое задание',
    'Сделать менеджер задач',
    '2019-12-31',
    CURDATE(),
    CURDATE(),
    'высокий',
    'выполнена',
    1,
    1
);

INSERT INTO todos(
    title,
    description,
    due_date,
    created_date,
    modified_date,
    priority,
    status,
    owner,
    assigned_user
) VALUES (
    'Подготовиться к застолью',
    'Купить хлеба и макарон',
    '2019-12-31',
    CURDATE(),
    CURDATE(),
    'низкий',
    'выполняется',
    1,
    2
);