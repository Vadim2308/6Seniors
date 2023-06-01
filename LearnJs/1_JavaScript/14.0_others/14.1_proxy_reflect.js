/**
 * Объект Proxy «оборачивается» вокруг другого объекта и может перехватывать разные действия с ним
 * Основные перехваты это get (чтение) и set (запись свойства)
 * new Proxy(target, handler);
 *      target - объект над которым нужен перехватчик
 *      handler - конфиг с перехватчиками.
 */

/**
 * Значение по умолчанию с ловушкой «get»
 * get(target, property, receiver).
 *    target – это оригинальный объект
 *    property – имя свойства
 *    receiver – если свойство геттер, то это объект, который будет использован как this при его вызове. Обычно это сам объект прокси
 */
{
    let numbers = [0, 1, 2];
    numbers = new Proxy(numbers, {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            } else {
                return 0; // значение по умолчанию
            }
        }
    });
    alert( numbers[1] ); // 1
    alert( numbers[123] ); // 0 (нет такого элемента)
}
{
    let dictionary = {
        'Hello': 'Hola',
        'Bye': 'Adiós'
    };
    dictionary = new Proxy(dictionary, {
        get(target, phrase) {
            if (phrase in target) {
                return target[phrase];
            } else {
                return phrase;
            }
        }
    });
    // Запросим перевод произвольного выражения в словаре!
    // В худшем случае оно не будет переведено
    alert( dictionary['Hello'] ); // Hola
    alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (нет перевода)
}

/**
 * Валидация с ловушкой «set»
 *  set(target, property, value, receiver)
 *      target – это оригинальный объект,
 *      property – имя свойства,
 *      value – значение свойства,
 *      receiver – аналогично ловушке get, этот аргумент имеет значение, только если свойство – сеттер.
 * Ловушка set должна вернуть true, если запись прошла успешно, и false в противном случае
 */
{
    let numbers = [];
    numbers = new Proxy(numbers, { // (*)
        set(target, prop, val) { // для перехвата записи свойства
            if (typeof val == 'number') {
                target[prop] = val;
                return true;
            } else {
                return false;
            }
        }
    });
    numbers.push(1); // добавилось успешно
    numbers.push(2); // добавилось успешно
    alert("Длина: " + numbers.length); // 2

    numbers.push("тест"); // TypeError (ловушка set на прокси вернула false)

    alert("Интерпретатор никогда не доходит до этой строки (из-за ошибки в строке выше)");
}

/**
 * Перебор при помощи «ownKeys» и «getOwnPropertyDescriptor»
 * Мы можем повесить ловушку на перебор for..in, Object.keys/values(), Object.getOwnPropertyNames(obj), Object.getOwnPropertySymbols(obj)
 */
{
    let user = {
        name: "Вася",
        age: 30,
        _password: "***"
    };

    user = new Proxy(user, {
        ownKeys(target) { // вызывается 1 раз для получения списка свойств
            return Object.keys(target).filter(key => !key.startsWith('_')); // Здесь должен быть массив ключей (user), которые будут потом перебираться в циклах
        }
    });

    // ownKeys исключил _password
    for(let key in user) alert(key); // name, затем: age

    // аналогичный эффект для этих методов:
    alert( Object.keys(user) ); // name,age
    alert( Object.values(user) ); // Вася,30
}

/**
 * Защищённые свойства с ловушкой «deleteProperty» и другими
 * Хоть и существует негласное соглашение, что с пропертям через _ мы не должны обращаться снаружи объекта, однако все равно это возможно.
 * Через прокси можно написать перехватчик, который будет запрещать нам это делать
 */
{
    let user = {
        name: "Вася",
        _password: "***"
    };

    user = new Proxy(user, {
        get(target, prop) {
            if (prop.startsWith('_')) {
                throw new Error("Отказано в доступе");
            } else {
                let value = target[prop];
                return (typeof value === 'function') ? value.bind(target) : value; // (*)
            }
        },
        set(target, prop, val) { // перехватываем запись свойства
            if (prop.startsWith('_')) {
                throw new Error("Отказано в доступе");
            } else {
                target[prop] = val;
                return true;
            }
        },
        deleteProperty(target, prop) { // перехватываем удаление свойства
            if (prop.startsWith('_')) {
                throw new Error("Отказано в доступе");
            } else {
                delete target[prop];
                return true;
            }
        },
        ownKeys(target) { // перехватываем попытку итерации
            return Object.keys(target).filter(key => !key.startsWith('_'));
        }
    });

        // "get" не позволяет прочитать _password
        try {
            alert(user._password); // Error: Отказано в доступе
        } catch(e) { alert(e.message); }

        // "set" не позволяет записать _password
        try {
            user._password = "test"; // Error: Отказано в доступе
        } catch(e) { alert(e.message); }

        // "deleteProperty" не позволяет удалить _password
        try {
            delete user._password; // Error: Отказано в доступе
        } catch(e) { alert(e.message); }

        // "ownKeys" исключает _password из списка видимых для итерации свойств
        for(let key in user) alert(key); // name
}

/**
 * «В диапазоне» с ловушкой «has»
 * Мы бы хотели использовать оператор in, чтобы проверить, что некоторое число находится в указанном диапазоне.
 */
{
    let range = {
        start: 1,
        end: 10
    };

    range = new Proxy(range, {
        has(target, prop) {
            return prop >= target.start && prop <= target.end
        }
    });

    alert(5 in range); // true
    alert(50 in range); // false
}

/**
 * Reflect
 * Упрощает работу с прокси, а также сохраняет нужный контекст при перенаправлении на исходный объект
 * Reflect даёт простую и безопасную возможность перенаправить операцию на оригинальный объект и при этом предохраняет нас от возможных ошибок, связанных с этим
 * Поэтому для корректной работы в прокси надо использовать рефлект, и заменять следующие операции
 *      obj[prop]	           Reflect.get(obj, prop)
 *      obj[prop] = value	   Reflect.set(obj, prop, value)
 *      delete obj[prop]	   Reflect.deleteProperty(obj, prop)
 *      new F(value)	       Reflect.construct(F, value)
 */
{
    let user = {
        name: "Вася",
    };

    user = new Proxy(user, {
        get(target, prop, receiver) {
            alert(`GET ${prop}`);
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, val, receiver) {
            alert(`SET ${prop}=${val}`);
            return Reflect.set(target, prop, val, receiver);
        }
    });

    let name = user.name; // выводит "GET name"
    user.name = "Петя"; // выводит "SET name=Петя"

    {
        let user = {
            _name: "Гость",
            get name() {
                return this._name;
            }
        };

        let userProxy = new Proxy(user, {
            get(target, prop, receiver) { // receiver = admin
                return Reflect.get(target, prop, receiver); // (*)
            }
        });

        let admin = {
            _name: "Админ",
            __proto__: userProxy,
        };
        alert(admin.name); // Админ
    }
}

/**
 * Ограничения прокси.
 * Многие структуры данных такие как Map, Set, Date, Promise и другие используют «внутренние слоты» для хранения данных
 * Поэтому есть нюансы по работу с проксированием этих структур данных
 * Проверка объектов на строгое равенство === не может быть перехвачена.
 * Примеры работы с проксированием классов, вышеуказанных структур данных можно посмотреть на сайте
 */

/**
 * Отключаемые прокси
 * Отключаемый (revocable) прокси – это прокси, который может быть отключён вызовом специальной функции.
 */
{
    let object = {
        data: "Важные данные"
    };
    let {proxy, revoke} = Proxy.revocable(object, {});
    // передаём прокси куда-нибудь вместо оригинального объекта...
    alert(proxy.data); // Важные данные
    // позже в коде
    revoke();
    // прокси больше не работает (отключён)
    alert(proxy.data); // Ошибка
}


/**
 * Task (Observable)
 * Создайте функцию makeObservable(target), которая делает объект «наблюдаемым», возвращая прокси.
 */
{
    function makeObservable(target) {
        let handlers = Symbol('handlers');
        // 1. Создадим хранилище обработчиков
        target[handlers] = [];
        // положим туда функции-обработчики для вызовов в будущем
        target.observe = function(observeFn) {
            this[handlers].push(observeFn);
        };

        // 2. Создадим прокси для реакции на изменения
        return new Proxy(target, {
            set(target, property, value, receiver) {
                let status = Reflect.set(...arguments); // перенаправим операцию к оригинальному объекту
                if (status) { // если не произошло ошибки при записи свойства
                    target[handlers].forEach(handler => handler(property, value));
                }
                return status;
            }
        });
    }

    let user = {};

    user = makeObservable(user);

    user.observe((key, value) => {
        alert(`SET ${key}=${value}`);
    });

    user.name = "John";
}