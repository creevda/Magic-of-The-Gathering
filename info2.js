// * Установить react-bootstrap и импортировать css в src -> main.jsx
// ^ Документация: https://react-bootstrap.netlify.app/
// ~ npm i react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// * useEffect - хук, выполняет стороние (side) эффекты в комонентах (когда нужно, чтобы компонент обновился сам)
// todo Примеры: таймеры, часы, получение данных с API, везде, где нужно автоматически обновить страницу
// * принимает в себя callback и массив зависимостей, callback запускается после первого рендера (когда в компоненты завершится return)
// ! callback не может быть async ф-ией
// * [] - массив зависимостей определяет сколько раз будет выполняться useEffect, есть 3 случая:
// * 1 если нет - отрабатывает на любое изменение любого состояния в компоненте
// * 2 если пустой - отработает только 1 раз при первом рендере
// * 3 не пустой - отработает при первом рендере и при каждом изменении любой зависимости

// * npm install axios