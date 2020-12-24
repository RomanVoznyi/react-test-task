import React from 'react';
import s from './Task2.module.css';

const Task2 = () => {
  return <div className={s.TaskField}>This is Task2</div>;
};

export default Task2;

// Задача:
// Разработать простое приложение для сортировки и отбора данных по заранее заданным
// правилам.Приложение должно уметь работать со списками JSON объектов произвольной
// структуры, отбирать объекты, содержащие ключи с определенными значениями, а также
// сортировать объекты по значениям, используя естественный порядок сортировки.
// 	sysgears.com
// hr@sysgears.com
// Например, если для данных вида:
// { “data”: [{ “name”: “John”, “email”: “john2@mail.com” },
// { “name”: “John”, “email”: “john1@mail.com” },
// { “name”: “Jane”, “email”: “jane@mail.com” }]}
// задать условие:
// { “condition”: { “include”: [{ “name”: “John” }], “sort_by”: [“email”] } }
// содержащее два правила - include и sort_by(где правило include принимает набор пар
// ключ: значение для проверки записей на соответствие, а правило sort_by принимает набор
// ключей для сортировки), результатом будет объект, содержащий только записи с именем
// John, отсортированные по ключу email:
// { “result”: [{ “name”: “John”, “email”: “john1@mail.com” },
// { “name”: “John”, “email”: “john2@mail.com” }]}
// Планируя подход к дизайну кода приложения, необходимо предусмотреть возможность
// расширять функционал через добавление в код новых “модулей” с правилами.Важно,
// 	чтобы все модули имели между собой идентичную структуру, были изолированы друг от
// друга и остального кода приложения, и взаимодействовали с основным кодом, используя
// один и тот же подход.В качестве примера, вы можете добавить модуль с дополнительным
// правилом exclude, которое будет отбрасывать записи, содержащие ключи с определенным
// значением.
// Входящие параметры:
// JSON объект со списком данных(data), и условием для обработки(condition):
// { “data”: [{ “user”: “mike@mail.com”, “rating”: 20, “disabled”: false },
// { “user”: “greg@mail.com”, “rating”: 14, “disabled”: false },
// { “user”: “john@mail.com”, “rating”: 25, “disabled”: true }],
// “condition”: { “exclude”: [{ “disabled”: true}], “sort_by”: [“rating”] }}
// Выходные данные:
// JSON объект с данными полученными после применения условия обработки(result):
// { “result”: [{ “user”: “greg@mail.com”, “rating”: 14, “disabled”: false },
// { “user”: “mike@mail.com”, “rating”: 20, “disabled”: false }]}