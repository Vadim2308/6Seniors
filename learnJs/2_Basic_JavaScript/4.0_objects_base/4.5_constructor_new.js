/**
 * Обычный синтаксис {...} позволяет создать только один объект.
 * Но зачастую нам нужно создать множество похожих, однотипных объектов, таких как пользователи, элементы меню и так далее.
 * Для создания однотипных объектов мы можем использовать функции конструкторы
 */

/**
 * Функции-конструкторы технически являются обычными функциями. Но есть два соглашения:
 * Имя функции-конструктора должно начинаться с большой буквы.
 * Функция-конструктор должна выполняться только с помощью оператора "new".
 */

/**
 * Стрелочные функции и конструктор. Со стрелками работать не будет
 */
{
    const Test = () => ({});
    const res = new Test();
    console.log(res) // Test is not a constructor
}
{
    function Test() {};
    const res = new Test();
    console.log(res) // Test
}
{
    function User(name) {
        this.name = name;
        this.isAdmin = false;
    }
    let user = new User("Jack");
    alert(user.name); // Jack
    alert(user.isAdmin); // false
    {
        /**
         * Под капотом происходит следующее.
         * 1. Создается пустой объект, и он присваивается к this (неявно)
         * 2. Выполняется тело функции, обычно добавляя в this свойства
         * 3. Возвращет this (неявно)
          */
        function User(name) {
            // this = {};  (неявно)
            // добавляет свойства к this
            this.name = name;
            this.isAdmin = false;
            // return this;  (неявно)
        }
        const Ann = new User("Ann")
        const Alice = new User("Alice")
        /**
         * Это все аналогично созданию объекта через литерал {...}
         */
        let user = {
            name: "Jack",
            isAdmin: false
        };
    }
}

/**
 * Если необходимо создать один большой объект,
 * то мы можем обернуть их в функцию-конструктор, которая будет немедленно вызвана, вот так:
 */
{
    let user = new function() {
        this.name = "John";
        this.isAdmin = false;
        // ...другой код для создания пользователя
        // возможна любая сложная логика и инструкции
        // локальные переменные и так далее
    };
    /**
     * Такой конструктор не может быть вызван снова, так как он нигде не сохраняется, просто создаётся и тут же вызывается.
     */
}
/**
 * Проверка на вызов в режиме конструктора: new.target
 * Используя специальное свойство new.target внутри функции, мы можем проверить, вызвана ли функция при помощи оператора new или без него.
 */
{
    function User() {
        alert(new.target);
    }
    // без "new":
    let u1 = User(); // u1 === undefined
    // с "new":
    let u2 = new User(); // u2 === function User { ... }
}

/**
 * Возврат значения из конструктора, return
 * То что надо запомнить:
 *   1.При вызове return с НЕ ПРИМИТИВОМ, вместо this вернётся то что лежит после return.
 *   2.При вызове return с примитивным значением, оно проигнорируется, и вернется this.
 */
{
    function BigUser() {
        this.name = "John";
        return { name: "Godzilla" };  // <-- возвращает этот объект
    }
    alert(new BigUser().name);  // Godzilla, получили этот объект
    {
        function SmallUser() {
            this.name = "John";
            return; // <-- возвращает this
        }
        alert(new SmallUser().name);  // John
    }
}

/**
 * Пропуск скобок (BAD PRACTISE!)
 */
{
    let user = new User; // <-- без скобок
    // то же, что и
    let user = new User();
}

/**
 * Создание методов в конструкторе
 */

{
    function User(name) {
        this.name = name;
        this.sayHi = function() {
            alert( "Меня зовут: " + this.name );
        };
    }
    let john = new User("John");
    john.sayHi(); // Меня зовут: John
    /*
    john = {
       name: "John",
       sayHi: function() { ... }
    }
    */

    // this работает даже со стрелкой
    function User(name) {
        this.name = name;
        this.sayHi = () => {
            console.log('Меня зовут: ' + this.name);
        };
    }
    const u1 = new User('Vadim');
    u1.sayHi(); // Меня зовут: Vadim

}