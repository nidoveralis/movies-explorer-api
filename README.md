# Movies explorer (backend)

## Описание

Бэкенд-часть проекта [Movies-explorer](https://github.com/nidoveralis/movies-explorer-frontend), отвечает за хранение и обмен файлами с веб-приложением. Она состоит из моделей, контроллеров и роутов, которые работают вместе для обеспечения функциональности приложения.

## Функционал
- Регистрация и авторизация пользователей.
- Обновление информации о пользователе.
- Получение информации о текущем пользователе.
- Получение списка фильмов.
- Создание нового фильма.
- Удаление фильма.
- Обработка ошибок и валидация входящих данных.

## Технологии
- NodeJS - среда выполнения JavaScript на сервере.
- Express - веб-фреймворк для NodeJS, который облегчает разработку веб-приложений.
- MongoDB - NoSQL база данных.
- Mongoose - библиотека для работы с MongoDB в NodeJS.

## Структура проекта
[!] ```/routes``` - содержит файлы роутера.
```/controllers``` - содержит файлы контроллеров для работы с пользователями и фильмами.
[!] ```/models``` - содержит файлы описания схем пользователя и фильма для работы с базой данных.
```/middlewares``` - содержит мидлвары, включая механизмы аутентификации, обработку ошибок, логгирование и валидацию данных.
```/errors``` - содержит кастомные ошибки, которые могут возникнуть в процессе работы приложения.
```/utils``` - содержит константы и файл конфигурации.

## Для запуска проекта
1. Склонируйте проект.
2. Установите зависимости, выполнив команду ```npm i```.
3. Запустите MongoDB, выполнив команду ```mongod```.
4. Запустите сервер, выполнив команду ```npm run start```.
