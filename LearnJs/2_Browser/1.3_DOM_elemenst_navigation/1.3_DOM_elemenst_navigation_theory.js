/**
 * Все операции с DOM начинаются с объекта document. Это главная «точка входа» в DOM.
 *  <html> = document.documentElement. Самый верхний узел документа
 *  <body> = document.body
 *  <head> = document.head
 */

/**
 * document.body может быть равен null
 * В DOM значение null значит «не существует» или «нет такого узла».

 * <html>
 * <head>
 *   <script>
 *     alert( "Из HEAD: " + document.body ); // null, <body> ещё нет
 *   </script>
 * </head>
 *
 * <body>
 *   <script>
 *     alert( "Из BODY: " + document.body ); // HTMLBodyElement, теперь он есть
 *   </script>
 * </body>
 * </html>
 */

/**
 * Дети: childNodes, firstChild, lastChild
 * Дочерние узлы (или дети) – элементы, которые являются непосредственными детьми узла;
 * Потомки – все элементы, которые лежат внутри данного, включая детей, их детей и т.д.

 * Коллекция childNodes содержит список всех детей, включая текстовые узлы.
 *
 * Свойства firstChild и lastChild обеспечивают быстрый доступ к первому и последнему дочернему элементу.
 * elem.childNodes[0] === elem.firstChild
 * elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
 * Для проверки наличия дочерних узлов существует также специальная функция elem.hasChildNodes().
 */

/**
 * DOM-коллекции
 * childNodes похож на массив. На самом деле это не массив, а коллекция – особый перебираемый объект-псевдомассив.
 * Мы не можем напрямую изменить дочерний узел на другой, например childNodes[i] === .... Для этого есть специальные методы
 */
{
    for (let node of document.body.childNodes) {
        alert(node); // покажет все узлы из коллекции
    }
    // На можно сразу преобразовать в массив, и работать с ним
    alert(Array.from(document.body.childNodes).filter ); // сделали массив
}

/**
 * Соседи и родитель
 * Соседи – это узлы, у которых один и тот же родитель.
 *
 * <body> – «следующий» или «правый» сосед <head>
 * <head> «предыдущий» или «левый» сосед <body>.
 *
 * Следующий узел того же родителя (следующий сосед) – в свойстве nextSibling, а предыдущий – в previousSibling.
 * Родитель доступен через parentNode.
 */
{
    // <html>
    //    <head>...</head>
    //    <body>...</body>
    // </html>

    // родителем <body> является <html>
    alert(document.body.parentNode === document.documentElement); // выведет true

    // Соседом сверху для documentElement будет DOCTYPE
    console.log(document.documentElement.previousSibling) // DOCTYPE

    // Соседом снизу для documentElement будет null
    console.log(document.documentElement.nextSibling) // null

    // после <head> идёт <body>
    alert(document.head.nextSibling); // HTMLBodyElement

    // перед <body> находится <head>
    alert( document.body.previousSibling ); // HTMLHeadElement
}

/**
 * (!) Навигация только по элементам
 * childNodes учитывает не только элементы, но и текстовые узлы. Но работаем мы в основном с элементами
 *      children – коллекция детей, которые являются элементами.
 *      firstElementChild, lastElementChild – первый и последний дочерний элемент.
 *      previousElementSibling, nextElementSibling – соседи-элементы.
 *      parentElement – родитель-элемент.
 *
 * parentElement возвращает родитель-элемент. Но есть небольшое различине между parentElement и parentNode
 */
{
    alert(document.documentElement.parentNode); // выведет document
    alert(document.documentElement.parentElement); // выведет null
    // Причина в том, что родителем корневого узла document.documentElement (<html>) является document. Но document – это не узел-элемент, так что parentNode вернёт его, а parentElement нет.
}

/**
 * Некоторые типы DOM-элементов предоставляют для удобства дополнительные свойства, специфичные для их типа.
 * Например таблицы
 * table.rows – коллекция строк <tr> таблицы.
 * table.tBodies – коллекция элементов таблицы <tbody> (по спецификации их может быть больше одного).
 * Примеры смотри на learnJS
 */

/**
 * Есть два основных набора ссылок:
 * Для всех узлов: parentNode, childNodes, firstChild, lastChild, previousSibling, nextSibling.
 * Только для узлов-элементов: parentElement, children, firstElementChild, lastElementChild, previousElementSibling, nextElementSibling.
 */