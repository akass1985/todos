CREATE TABLE users(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    middlename VARCHAR(30) NOT NULL,
    login VARCHAR(30) UNIQUE,
    password text NOT NULL,
    salt TEXT NOT NULL,
    chief INT DEFAULT 0
);

INSERT INTO users(firstname, lastname, middlename, login, password, salt, chief) 
    VALUES('Алексей', 'Кассь', 'Борисович', 'alexeykass', '81e8cf1af2d776234d8afd433799ce8bca1e0297714213e51a55f4a3d2fcf1b68b620a321e5d2bcea455702b95a605789af4a9e34c10f183550172acc373f6fc', '7871803669b11a45', 0);

INSERT INTO users(firstname, lastname, middlename, login,  password, salt, chief) 
    VALUES('Иван', 'Иванов', 'Иванович', 'i.i.ivanov', '861be333d9b27ce30801f52e011cef54995925ed83b4e04f5fbc32708da90ac94991cf3c3eb19346c95f13f422a4b15c96d412b0f3ff6a4efa9c6ef2d28fb8af', '7871803669b11a45', 1);

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