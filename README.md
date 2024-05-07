# React + TypeScript + Vite

# Простое приложение-прототип системы ведения заявок для логистов в авто грузоперевозках

## Описание

Это простое web-приложение для ведения заявок в авто грузоперевозках. Оно использует JSON Server для имитации backend (REST-API).

## Запуск проекта

1. Склонировать репозиторий.
2. Проинициализировать проект (`pnpm install`).
3. В файле `package.json` в разделе `scripts` запустить скрипты:
    - `json-server-db` для запуска JSON Server на порту 3000.
    - `dev` для запуска приложения в режиме разработки.

## Endpoints

В проекте реализованы следующие endpoints:

1. `createApplication` (создание заявки):
    - method: 'POST'
    - url: `applications`

2. `deleteApplication` (удаление заявки):
    - method: 'DELETE'
    - url: `applications/${args.id}`

3. `getApplications` (получение списка заявок):
    - method: 'GET'
    - url: 'applications'

4. `getApplicationsById` (получение заявки по id):
    - method: 'GET'
    - url: `applications/${id}`

5. `updateApplication` (обновление заявки):
    - method: 'PATCH'
    - url: `applications/${args.id}`

## Зависимости

В проекте используются следующие зависимости:

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@reduxjs/toolkit": "^2.2.3",
    "react": "^18.2.0",
    "react-datepicker": "^6.9.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.51.4",
    "react-icons": "^5.2.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.23.0",
    "zod": "^3.23.6"
  },
  "devDependencies": {
    "sass": "^1.76.0",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  },
  "peerDependencies": {
    "@gravity-ui/uikit": "^6.14.1"
  }
}