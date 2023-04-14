/**
 * Map — коллекция для хранения данных любого типа в виде пар [ключ, значение], то есть каждое значение сохраняется по уникальному ключу, который потом используется для доступа к этому значению.
 * Причём в качестве ключей тоже принимаются значения любого типа.
 */

/**
 * Основные методы для работы с коллекцией Map:
 * set(ключ, значение) — устанавливает значение;
 * get(ключ) — возвращает значение;
 * has(ключ) — проверяет наличие переданного ключа;
 * values() — возвращает итератор MapIterator всех значений коллекции;
 * keys() — возвращает итератор MapIterator всех ключей коллекции;
 * entries() — возвращает итератор MapIterator пар [ключ, значение];
 * delete(ключ) — удаляет конкретное значение;
 * clear() — полностью очищает коллекцию;
 * forEach(колбэк) — перебирает ключи и значения коллекции.
 */

// {
//   const someData = new Map()

//   someData.set('1', 'Значение под строковым ключом 1')
//   someData.set(1, 'Значение под числовым ключом 1')
//   someData.set(true, 'Значение под булевым ключом true')

//   console.log(someData.size) // 3
//   console.log(someData.get(1)) // Значение под числовым ключом 1
//   console.log(someData.get('1')) // Значение под строковым ключом 1
//   console.log(someData.has(true)) // true
//   someData.clear()
//   console.log(someData.size) // 0

// }

/**
 * Можно создать как пустой Map, так и сразу со значениями
 */
// {
//   const map = new Map([['js', 'JavaScript'], ['css', 'Cascading Style Sheets']])
//   console.log(map.size) // 2
// }


/**
 * Обход значений
 */
// {
//   const map = new Map()

//   map.set('html', 'HTML')
//   map.set('css', 'CSS')
//   map.set('js', 'JavaScript')

//   for (let [key, value] of map.entries()) { //[["html","HTML"],["css","css"],["js","JavaScript"]]
//     console.log(`${key} - ${value}`)
//   }
//   // html - HTML
//   // css - CSS
//   // js - JavaScript

//   map.forEach((value, key) => {
//     console.log(`${key} - ${value}`)
//   })
//    /**
//    * Обратите внимание: когда вызывается метод forEach(), в колбэк передаются текущее значение и ключ — индексов в Map нет.
//    */
//   // html - HTML
//   // css - CSS
//   // js - JavaScript

// }

/**
 * Отличия от объектов
 * Обычные объекты тоже подходят для хранения данных. Однако ключи в них могут быть только строками или символами
 * Map же позволяет использовать в качестве ключа любое значение: объект, функцию, примитивные значения и даже null, undefined и NaN.
 */

// {
//   const func = (name) => `Hello, ${name}`
//   const obj = { foo: 'bar' }

//   const map = new Map()
//   map.set(func, 'func value')
//   map.set(obj, 'object value')
//   map.set(undefined, 'undefined value')
//   map.set(NaN, 'NaN value')
//   map.set(null, 'null value')

//   console.log(map.get(func))     // func value
//   console.log(map.get(obj))     // object value
//   console.log(map.get(undefined)) // undefined value
//   console.log(map.get(NaN))     // NaN value
//   console.log(map.get(null)) // null value

// }

/**
 * Для сравнения ключей используется алгоритм SameValueZero.
 * Алгоритм Same-Value-Zero аналогичен выполнению сравнения значений строгого равенства (===). Однако они отличаются тем, как сравнивается NaN. В строгом равенстве NaN !== NaN, в sameValueZero NaN === NaN
 * Например, SameValueZero используется в Array.prototype.includes() а также, Map и Set методы для сравнения равенства ключей.
 * https://tc39.es/ecma262/#sec-samevaluezero 7.2.11
 */

// {
//   const map = new Map()

//   map.set(1, 'numeric 1')
//   map.set('1', 'string 1')
//   console.log(map.get(1)) // numeric 1
//   console.log(map.get('1')) // string 1
// }

/**
 * При использовании не примитивных типов в качестве ключей стоит помнить, что они хранятся по ссылке, поэтому для доступа к заданному с помощью объекта ключу, необходимо передавать тот же самый объект.
 */
// {
//   const dataObject = { position: 'left' }
//   const sameObject = dataObject

//   console.log(dataObject === sameObject) // true

//   const map = new Map()
//   map.set(dataObject, 'value for dataObject')
//   map.set(sameObject, 'value for sameObject')

//   console.log(map.size) // 1
//   console.log(map.get(dataObject)) // value for sameObject
//   console.log(map.get(sameObject)) // value for sameObject

// }

/**
 * Если мы возьмём два отдельных объекта с одинаковым содержимым, то мы получим два разных ключа
 */
// {
//   const playerOne = { position: 'left' }
//   const playerTwo = { position: 'left' }

//   console.log(playerOne === playerTwo) // false

//   const map = new Map()
//   map.set(playerOne, 'player 1')
//   map.set(playerTwo, 'player 2')

//   console.log(map.size) // 2
//   console.log(map.get(playerOne)) // player 1
//   console.log(map.get(playerTwo)) // player 2
// }

/**
 * Set-ы
 * Set — коллекция для хранения уникальных значений любого типа.
 * Одно и то же значение нельзя добавить в Set больше одного раза.
 * Set — неиндексированная коллекция, положить элемент в коллекцию можно, но достать нельзя (нет метода get). По элементам коллекции можно итерироваться.
 */

/**
 * Основные методы для работы с коллекцией:
 * add() — добавить элемент.
 * delete() — удалить элемент.
 * has() — проверить, есть ли элемент в коллекции.
 * clear() — очистить коллекцию.
 * forEach() — выполнить функцию для каждого элемента в коллекции, аналогично одноимённому методу массива.
 * Содержит свойство size для получения количества элементов в коллекции.

 * set.keys() – возвращает перебираемый объект (SetIterator) для значений,
 * set.values() – то же самое, что и set.keys(), присутствует для обратной совместимости с Map,
 * set.entries() – возвращает перебираемый объект (SetIterator) для пар вида [значение, значение], присутствует для обратной совместимости с Map
 */
// {
//   const uniqueIds = new Set()

//   uniqueIds.add(123)
//   uniqueIds.add(456)
//   uniqueIds.add(111)
//   uniqueIds.add(123)

//   console.log(uniqueIds.size) // 3
//   console.log(uniqueIds.has(111)) // true

//   uniqueIds.delete(111)
//   console.log(uniqueIds.size) // 2

//   uniqueIds.clear()
//   console.log(uniqueIds.size) // 0
// }

/**
 * Создание коллекции
 */
// {
//   const set = new Set()
//   console.log(set.size) // 0

//   const filled = new Set([1, 2, 3, 3, 3, 'hello'])
//   console.log("filled", filled.size) // 4
// }

/**
 * Обход
 * Set — это неиндексированная коллекция. В этой структуре данных нет понятия индекса элемента, поэтому нельзя получить произвольный элемент коллекции. В коллекцию можно только положить значение, а получить отдельное значение нельзя. (Как с массивами, по индексу нельзя. Будет undefined)
 * Основной инструмент работы с Set — обход коллекции. При обходе коллекции нам гарантируется, что мы будем получать элементы в порядке их добавления в Set, то есть первыми обойдём элементы добавленные раньше всего.
 * Обход можно организовать двумя способами:
 */
// {
//   // 1️⃣ Использовать метод forEach(), который работает аналогично одноимённому методу массива:
//   const filled = new Set([1, 2, 3, 3, 3, 'hello'])
//   filled.forEach(function(value) {
//     console.log(value)
//   })
//   // 1
//   // 2
//   // 3
//   // 'hello'
// }
// {
//   // 2️⃣ Воспользоваться for...of:
//   const filled = new Set([1, 2, 3, 3, 3, 'hello'])
//   for (let n of filled) {
//     console.log(n)
//   }
//   // 1
//   // 2
//   // 3
//   // 'hello'
// }

/**
 * Особенности работы с непримитивными типами
 * Set использует строгое сравнение для проверки, есть ли элемент в коллекции или нет. Работает механизм SameValueZero
 */
// {
//   const set = new Set()
//   set.add(1)
//   set.add('1')
//   set.add(NaN).add(NaN)
//   console.log(set.size) // 3
// }
/**
 * Нюансы по уникальности new Set().
 */
// {
//   const uniq = new Set();
//   uniq.add({ name: "Vadim" }).add({ name: "Vadim" }).add({ name: "Oleg" }).add({ name: "Oleg" }); // это разные объекты
//   for (let user of uniq) {
//     console.log(user.name); // Vadim Vadim Oleg Oleg
//   }
//   {
//     const uniq = new Set();
//     const u1 = { name: "Vadim" }
//     const u2 = { name: "Oleg" }
//     uniq.add(u1).add(u2).add(u1).add(u2);
//     for (let user of uniq) {
//       console.log(user.name); // Vadim Oleg
//     }
//   }
// }

/**
 * Собственная имплементация Map
 */

// {
//   class Dictionary {
//     constructor() {
//       this.map = Object.create(null); // Берем чистый объект, без прототипа. Чтоб при поиске интерпритатор не лез в прототипы
//     }
//     set(key, value) {
//       this.map[key] = value;
//       return this; // Для того чтоб писать много сетов в виде цепочки
//     }
//     get(key) {
//       return this.map[key];
//     }
//     has(key) {
//       // TODO: false, null, undefined, '', 0
//       return !!this.map[key];
//     }
//     delete(key) {
//       delete this.map[key];
//     }
//     get size() {
//       return Object.keys(this.map).length;
//     }
//     keys() {
//       return Object.keys(this.map);
//     }
//     clear() {
//       this.map = Object.create(null);
//     }
//     static from(object) {
//       const instance = new Dictionary();
//       for (const key in object) {
//         instance.set(key, object[key]);
//       }
//       return instance;
//     }
//   }

//   // Usage
//   const cities = {
//     Shanghai: 24256800,
//     Beijing: 21516000,
//     Delhi: 16787941,
//     Lagos: 16060303,
//   };

//   const cityPopulation1 = Dictionary.from(cities);
//   console.log(cityPopulation1 instanceof Dictionary); // true

//   const cityPopulation2 = new Dictionary();
//   cityPopulation2.set('Shanghai', 24256800).set('Beijing', 21516000).set('Delhi', 16787941).set('Lagos', 16060303);
//   console.log({ cityPopulation2 });

//   cityPopulation2.delete('Shanghai');
//   console.log({ cityPopulation2 });

//   if (cityPopulation2.has('Beijing')) {
//     console.log('Beijing:', cityPopulation2.get('Beijing'));
//   }

//   if (!cityPopulation2.has('Shanghai')) {
//     console.log('no data for Shanghai');
//   }

//   console.log('size:', cityPopulation2.size);
//   console.log('keys:', cityPopulation2.keys());
// }


/**
 * Согласно спецификации ECMAScript (24.1), объект Map должен использовать хэш-таблицу для хранения и управления парами ключ-значение.
 *  Ключи, и значения могут быть произвольными значениями языка ECMAScript.
 *  Отдельное значение ключа может встречаться только в одной паре ключ/значение в коллекции Map.
 *  Хеш-таблица — это структура данных, в которой все элементы хранятся в виде пары ключ-значение, где:
 *  ключ — уникальная сущность, которая используется для индексации значений;
 *  значение — данные, которые с этим ключом связаны.
 */
{
    const map = new Map() // Создали ХТ.
}
/**
 * Система слотов.
 * Слот - ячейка памяти, которая имеет свой индекс и хранит в себе ключ/значение сущности.
 * Когда новый элемент добавляется в коллекцию, он сохраняется в новом слоте вместе с ключом.
 * Ключ используется для вычисления хэш-значения, которое затем преобразуется в индекс слота с помощью хэш-функции. Функция должна быть детерменированной, т.е. возвращать всегда одно и то же значение при одинаковых входных данных
 * Когда элемент с определенным ключом добавляется в коллекцию, его значение заменяет значение в уже существующем слоте с тем же ключом.

 * При добавлении новой пары ключ-значение в Map, ключ используется для вычисления хэш-значения, которое затем преобразуется в индекс слота с помощью хэш-функции. Функция должна быть детерменированной, т.е. возвращать всегда одно и то же значение при одинаковых входных данных
 * Если несколько ключей имеют одинаковые хэш-значения, то они помещаются в один и тот же слот.
 * */
{
    const map = new Map()
    map.set('aboba', 10) // Произошла внутри магия, которая превратила ключ aboba например в индекс 1. Далее в слот в памяти, который имеет индекс 1 переместился aboba со значением 10
}
/**
 * При поиске значения в Map используется ключ для вычисления хэш-значения и индекса слота. Затем происходит поиск. Если ключ не найден, возвращается значение undefined.
 */
{
    const map = new Map([['aboba', 10]]);
    map.get('aboba') // Произошла внутри магия, которая преобразовала aboba в 1, и пошла в слот, который имеет индекс === 1. И вернула значение.
}
/**
 * Если количество элементов в Map становится больше, чем количество зарезервированных слотов, то Map автоматически выделяет дополнительную память для новых слотов. Это делается за счет увеличения размера буфера, который хранит все слоты. Это означает, что Map создает новую хэш-таблицу с большим числом слотов и переносит все пары ключ-значение из старой хэш-таблицы в новую.
 * При удалении элемента из Map, связанный с ним слот освобождается и может быть использован для хранения новых элементов. Если количество свободных слотов становится слишком большим, то Map может уменьшить размер буфера, чтобы освободить память.
 * Таким образом, система слотов в Map позволяет эффективно хранить и управлять коллекцией элементов, автоматически выделяя и освобождая память при необходимости.
 * ИТОГО: Map использует хэш-таблицы и хэш-функции для оптимизации работы с коллекцией, что делает Map очень удобным и эффективным инструментом для работы с данными в JavaScript.
 */
