# Миграции

При запуске приложения в docker'е БД сразу создаёт все таблицы и заполняет данным до последней миграции.

## Выполнить миграции 

    ./node_modules/db-migrate/bin/db-migrate up -c 8 -e example

Выполнит 8 миграций для БД example. Чтобы выполнить одну миграцию:

    db-migrate up 20150207135259-myFancyMigration

## Откат миграций

    ./node_modules/db-migrate/bin/db-migrate down -c 5 -e example

Чтобы отменить все миграции:

    db-migrate reset