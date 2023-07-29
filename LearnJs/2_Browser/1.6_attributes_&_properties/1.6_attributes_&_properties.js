/**
 * DOM-свойства
 * DOM-узлы – это обычные объекты JavaScript. Мы можем их изменять.
 * Например, создадим новое свойство для document.body:
 */
{
    document.body.myData = {
        name: 'Caesar',
        title: 'Imperator'
    };
    alert(document.body.myData.title); // Imperator

    document.body.sayTagName = function() {
        alert(this.tagName);
    };

    document.body.sayTagName(); // BODY (значением "this" в этом методе будет document.body)

    Element.prototype.sayHi = function() {
        alert(`Hello, I'm ${this.tagName}`);
    };

    document.documentElement.sayHi(); // Hello, I'm HTML
    document.body.sayHi(); // Hello, I'm BODY
}

/**
 * HTML-атрибуты
 * elem.hasAttribute(name) – проверяет наличие атрибута.
 * elem.getAttribute(name) – получает значение атрибута.
 * elem.setAttribute(name, value) – устанавливает значение атрибута.
 * elem.removeAttribute(name) – удаляет атрибут.
 */

/**
 * DOM-свойства типизированы
 * DOM-свойства не всегда являются строками. Например, свойство input.checked (для чекбоксов) имеет логический тип
 */

/**
 * Нестандартные атрибуты
 */
{
    /**
     *     <div show-info="name"></div>
     *     <div show-info="age"></div>
     *
     *     <script>
     *         let user = {
     *         name: "Pete",
     *         age: 25
     *     };
     *         for(let div of document.querySelectorAll('[show-info]')) {
     *         // вставить соответствующую информацию в поле
     *         let field = div.getAttribute('show-info');
     *         div.innerHTML = user[field]; // сначала Pete в name, потом 25 в age
     *     }
     *     </script>
     */
}
/**
 * dataset
 * Все атрибуты, начинающиеся с префикса «data-», зарезервированы для использования программистами. Они доступны в свойстве dataset.
 * Например, если у elem есть атрибут "data-about", то обратиться к нему можно как elem.dataset.about.
 * Атрибуты, состоящие из нескольких слов, к примеру data-order-state, становятся свойствами, записанными с помощью верблюжьей нотации: dataset.orderState.
 */
{
    /**
     *     <body data-about="Elephants">
     *     <script>
     *         alert(document.body.dataset.about); // Elephants
     *     </script>
     */
}
