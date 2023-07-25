/**
 * document.getElementById или просто id
 * Если у элемента есть атрибут id, то мы можем получить его вызовом document.getElementById(id),
 *
 * Значение id должно быть уникальным. В документе может быть только один элемент с данным id.
 *
 * Если в документе есть несколько элементов с одинаковым значением id, то поведение методов поиска непредсказуемо.
 * Браузер может вернуть любой из них случайным образом.
 */
{
    /**
      <div id="elem">
       <div id="elem-content">Element</div>
      </div>

      <script>
        // получить элемент
        let elem = document.getElementById('elem');

        // сделать его фон красным
        elem.style.background = 'red';
        </script>
     */
}

/**
 * querySelectorAll
 * Самый универсальный метод поиска – это elem.querySelectorAll(css), он возвращает все элементы внутри elem, удовлетворяющие данному CSS-селектору.
 *
 * document.querySelectorAll(':hover') вернёт коллекцию (в порядке вложенности: от внешнего к внутреннему) из текущих элементов под курсором мыши.
 *
 * querySelector возвращает первый элемент, соответствующий данному CSS-селектору.
 *
 */
{
    /**
          <ul>
              <li>Этот</li>
              <li>тест</li>
          </ul>
          <ul>
              <li>полностью</li>
              <li>пройден</li>
          </ul>
          <script>
              let elements = document.querySelectorAll('ul > li:last-child');
              for (let elem of elements) {
              alert(elem.innerHTML); // "тест", "пройден"
          }
          </script>
     */
}

/**
 * matches
 * Метод elem.matches(css) ничего не ищет, а проверяет, удовлетворяет ли elem CSS-селектору, и возвращает true или false.
 */
{
    /**
     * <a href="http://example.com/file.zip">...</a>
     * <a href="http://ya.ru">...</a>
     *
     * <script>
     *   // может быть любая коллекция вместо document.body.children
     *   for (let elem of document.body.children) {
     *     if (elem.matches('a[href$="zip"]')) {
     *       alert("Ссылка на архив: " + elem.href );
     *     }
     *   }
     * </script>
     */
    //=================================================//
    {
        /**
         *     <ul id="myList">
         *         <li>Item 1</li>
         *         <li className="selected">Item 2</li>
         *         <li>Item 3</li>
         *     </ul>
         */
        const myList = document.getElementById('myList');
        const items = myList.querySelectorAll('li');

        items.forEach(item => {
            if (item.matches('.selected')) {
                console.log(item.textContent); // Item 2
            }
        });
    }
    //=================================================//
    {
        /**
         *     <div id="myDiv" class="highlight">Hello, World!</div>
         */
        const myDiv = document.getElementById('myDiv');
        console.log(myDiv.matches('.highlight')); // true
        console.log(myDiv.matches('#myDiv')); // true
        console.log(myDiv.matches('div')); // true
        console.log(myDiv.matches('span')); // false
    }
}

/**
 * closest
 * Метод elem.closest(css) ищет ближайшего предка, который соответствует CSS-селектору. Сам элемент также включается в поиск.
 * closest поднимается вверх от элемента и проверяет каждого из родителей. Если он соответствует селектору, поиск прекращается.
 * Метод возвращает либо предка, либо null, если такой элемент не найден.
 */
{
    /**
     * <h1>Содержание</h1>
     *
     * <div class="contents">
     *   <ul class="book">
     *     <li class="chapter">Глава 1</li>
     *     <li class="chapter">Глава 2</li>
     *   </ul>
     * </div>
     */
    let chapter = document.querySelector('.chapter'); // LI

    alert(chapter.closest('.book')); // UL
    alert(chapter.closest('.contents')); // DIV

    alert(chapter.closest('h1')); // null (потому что h1 - не предок)
}

/**
 * getElementsBy*
 * elem.getElementsByTagName(tag) ищет элементы с данным тегом и возвращает их коллекцию. Передав "*" вместо тега, можно получить всех потомков.
 * elem.getElementsByClassName(className) возвращает элементы, которые имеют данный CSS-класс.
 * document.getElementsByName(name) возвращает элементы с заданным атрибутом name. Очень редко используется.
 */

/**
 * Живые коллекции
 * Все методы "getElementsBy*" возвращают живую коллекцию. Такие коллекции всегда отражают текущее состояние документа и автоматически обновляются при его изменении.
 * querySelectorAll возвращает статическую коллекцию. Это похоже на фиксированный массив элементов.
 *
 * let divs = document.getElementsByTagName('div'); Т.е. при обращении к divs, через какое то время мы всегда будем иметь актульную коллекцию
 * let divs = document.querySelectorAll('div'); Дальнейшие изменения учитываться не будет. Фиксированная коллекция
 */