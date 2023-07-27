/**
 * У каждого тега имеются свои свойства, специфичные только им.
 * Но у них есть общие свойства и методы
 * Корнем иерархии является EventTarget, от него наследует Node и остальные DOM-узлы.
 * EventTarget: add.eventListener, removeEventListener, dispatchEvent и др.
 * Node: parentNode, nextSibling, childNodes insertBefore(Node node, Node? child) appendChild(Node node) replaceChild(Node node, Node child) removeChild(Node child) и т.д.
 *
 * HTMLElement является базовым классом для всех остальных HTML-элементов.
 *              HTMLInputElement – класс для тега <input>,
 *              HTMLBodyElement – класс для тега <body>,
 *              HTMLAnchorElement – класс для тега <a>,
 *
 * Иерархия для DOM-объект для тега <input>
 *     HTMLInputElement – этот класс предоставляет специфичные для элементов формы свойства,
 *     HTMLElement – предоставляет общие для HTML-элементов методы (и геттеры/сеттеры),
 *     Element – предоставляет типовые методы элемента,
 *     Node – предоставляет общие свойства DOM-узлов,
 *     EventTarget – обеспечивает поддержку событий (поговорим о них дальше),
 *     …и, наконец, он наследует от Object, поэтому доступны также методы «обычного объекта», такие как hasOwnProperty.
 */
{
    alert( document.body instanceof HTMLBodyElement ); // true
    alert( document.body instanceof HTMLElement ); // true
    alert( document.body instanceof Element ); // true
    alert( document.body instanceof Node ); // true
    alert( document.body instanceof EventTarget ); // true
}

/**
 * Тег: nodeName и tagName
 */
{
    alert( document.body.nodeName ); // BODY для элементов оно равно tagName, для остальных типов узлов (текст, комментарий и т.д.) оно содержит строку с типом узла.
    alert( document.body.tagName ); // BODY - tagName есть только у элементов Element.
}

/**
 * innerHTML: содержимое элемента
 * Свойство innerHTML позволяет получить HTML-содержимое элемента в виде строки.
 *
 * Если innerHTML вставляет в документ тег <script> – он становится частью HTML, но не запускается.
 */
{
    // <body>
    // <p>Параграф</p>
    // <div>DIV</div>
    //
    // <script>
    //     alert( document.body.innerHTML ); // читаем текущее содержимое
    //     document.body.innerHTML = 'Новый BODY!'; // заменяем содержимое
    // </script>
    //
    // </body>
}

/**
 * outerHTML: HTML элемента целиком
 * Свойство outerHTML содержит HTML элемента целиком. Это как innerHTML плюс сам элемент.
 */
{
    // <div id="elem">Привет <b>Мир</b></div>
    //
    // <script>
    //     alert(elem.outerHTML); // <div id="elem">Привет <b>Мир</b></div>
    // </script>
}

/**
 * nodeValue/data: содержимое текстового узла
 */
{
    /**
     *     <body>
     *        Привет
     *        <!-- Комментарий -->
     *     <script>
     *         let text = document.body.firstChild;
     *         alert(text.data); // Привет
     *         let comment = text.nextSibling;
     *         alert(comment.data); // Комментарий
     *     </script>
     *     </body>
     */
}

/**
 * textContent: просто текст
 * Текст внутри элемента: HTML за вычетом всех <тегов>
 * Можно использовать для защиты от вставки произвольного HTML кода.
 */

/**
 * Свойство «hidden»
 * Атрибут и DOM-свойство «hidden» указывает на то, видим ли мы элемент или нет.
 */
{
    // <div id="elem">Мигающий элемент</div>
    //
    // <script>
    //     setInterval(() => elem.hidden = !elem.hidden, 1000);
    // </script>
}