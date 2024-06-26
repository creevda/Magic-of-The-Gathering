// ! Уже есть eslint
// * Уже есть .gitignore, package.json с зависимостями

// ? jsx - позволяет вставлять js в html разметку
// ! Если export - то можно в 1 файле несколько делать, в файле, где import - достаю через деструктуризацию
// ! Если export default - то только 1 ф-я в файле!
// ! Если куча ф-ий то - export. Если export default - то без деструктуризации import Compo3, { Compom Compo2 } from './..'

// ? Виртуальный DOM: когда в коде реакта меняется часть - компоненты прогружаются сверху вниз и он сравнивает каждый компонент
// ? и каждый элемент и меняет точечно. Ему не нужно перерисовывать всё DOM дерево, меньше затрат на производительность
// ? Не всё заново, запуск всех скриптов и новый html, а аккуратное изменение конкретного элемента
// ! Чтобы что-то поменялось визульно, это должно поменяться в стейте (состоянии)

// ? Хуки - ф-ии, который написаны за нас и выполняют действия, наша задача понять их и начать применять
// * useState - хук (функция), которая хранит в себе состояния (данные) компонента, некая память компонента
// * принимает любое значение, возвращает массив с 2мя элементами:
// * 1) состояние компонента (любой тип данных)
// * 2) ф-ия, изменяющая состояние
// ! Изменять состояние нужно с помощью это ф-ии, при этом передавая в неё callback
// todo Пример: 
const [visible, setVisible] = useState(false)

setVisible((visible) => !visible)

// ! Правила хуков:
// todo 1 Любой хук должен начинаться use...
// todo 2 Вызывать хуки только из React-функций (компоненты) 
// todo 3 Любой хук должен вызываться на верхнем уровне (не в циклах, не в условиях)

// ! Пишем на реакте
// todo создать папку client с dev окружением
// * npm create vite@latest client -- --template react
// todo выбираем: React, JavaScript

// todo зайди в папку client и установи зависимости npm i
// * https://jsonplaceholder.typicode.com/

// todo Подключение Bootstrap:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

// todo Подключить библиотеку react-router-dom для роутинга на клиенте
// * Использовать RouterProvider, createBrowserRouter Outlet, NavLink, Link
// ^ Документация: https://reactrouter.com/en/main
// ~ npm i react-router-dom

// todo Создать компонент NavBar для дальнейшей маршрутизации на клиенте

// todo Переписать в src -> App.jsx, в router описать все нужные компоненты и их url
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>Hello World</div>
    ),
  },
]);

return <RouterProvider router={router} />

// todo Сделать, чтобы NavBar был на всех страницах
// todo Для этого создадим компонент client -> Root.jsx :
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/ui/NavBar'

export default function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
// ? <Outlet> - компонент, используемый в родительских элементах маршрута 
// ? для визуализации дочерних элементов маршрута. Это позволяет отображать 
// ? вложенный пользовательский интерфейс при отрисовке дочерних маршрутов. 
// ? Если родительский маршрут точно совпал, он отобразит дочерний маршрут или ничего, 
// ? если индексный маршрут отсутствует.
