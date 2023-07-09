/**
 * Флаги свойств
 * Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).
 *      writable – если true, свойство можно изменить, иначе оно только для чтения.
 *      enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
 *      configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
 */

/**
 * Когда мы создаём свойство «обычным способом», все они имеют значение true.
 */

/**
 * Object.getOwnPropertyDescriptor - позволяет получить полную информацию о свойстве.
 * Возвращаемое значение – объект (дескриптор свойства). Он содержит значение свойства и все его флаги.
 */
{
    let user = {
        name: "John"
    };

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    alert(JSON.stringify(descriptor, null, 2 ));
    /* дескриптор свойства:
    {
      "value": "John",
      "writable": true,
      "enumerable": true,
      "configurable": true
    }
    */
}

/**
 *  Object.defineProperty
 *  Используется для изменения флагов.
 *  Синтаксис Object.defineProperty(obj, propertyName, descriptor)
 *  Если свойство существует, этот метод обновит флаги. Если не существует, то создаст новое свойство.
 *  Если какой-либо флаг не указан, по дефолту ему подставляется false.
 */

{
    let user = {};

    Object.defineProperty(user, "name", {
        value: "John"
    });

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    alert(JSON.stringify(descriptor, null, 2 ));
    /*
    {
      "value": "John",
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
     */
    // Однако если мы уже в существующем свойстве меняем флаг, то значения остальных флагов будут true (если ничего не меняли до этого)
    {
        let user = {
            name: "John"
        };

        Object.defineProperty(user, "name", {
            configurable:false
        });

        console.log(Object.getOwnPropertyDescriptor(user,'name'))
        /**
         * {
         *   value: 'John',
         *   writable: true,
         *   enumerable: true,
         *   configurable: false
         * }
         */
    }
}

/**
 * Writable (Только для чтения)
 */
{
    let user = {
        name: "John"
    };

    Object.defineProperty(user, "name", {
        writable: false
    });

    user.name = "Pete"; //  (TypeError: Cannot assign to read only property 'name' of object ) (!)Ошибки появляются только в строгом режиме
}

/**
 * enumerable - Неперечислимое свойство
 */
{
    let user = {
        name: "John",
        toString() {
            return this.name;
        }
    };

    Object.defineProperty(user, "toString", {
        enumerable: false
    });

    // Теперь наше свойство toString пропало из цикла:
    for (let key in user) alert(key); // name
    alert(Object.keys(user)); // name
}

/**
 * configurable - Неконфигурируемое свойство
 * Неконфигурируемое свойство НЕ может быть удалено, его атрибуты НЕ могут быть изменены.
 * При этом можно изменить значение свойства!
 *
 * Определение свойства как неконфигурируемого – это дорога в один конец.
 * Мы не можем изменить его обратно с помощью defineProperty.
 */
{
    let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

    alert(JSON.stringify(descriptor, null, 2 ));
    /*
    {
      "value": 3.141592653589793,
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
    */

    {
        let user = {
            name: "John"
        };

        Object.defineProperty(user, "name", {
            writable: false,
            configurable: false
        });

        // теперь невозможно изменить user.name или его флаги (Ошибки отображаются только в строгом режиме)
        // всё это не будет работать:
        user.name = "Pete";
        delete user.name;
        Object.defineProperty(user, "name", { value: "Pete" });
    }
}

/**
 * Object.defineProperties
 * Метод Object.defineProperties(obj, descriptors), который позволяет определять множество свойств сразу.
 * Возвращаемое значение: Объект, переданный в функцию.
 */
{
    Object.defineProperties(user, {
        name: { value: "John", writable: false },
        surname: { value: "Smith", writable: false },
        // ...
    });
}

/**
 * Object.getOwnPropertyDescriptors
 * Метод для получения всех дескрипторы свойств
 */
{
    let user = {
        name: "John",
        car:"xsaxsasx",
        [Symbol("id")]:3
    };


    console.log(Object.getOwnPropertyDescriptors(user))
    /**
     * {
     *   name: {
     *     value: 'John',
     *     writable: true,
     *     enumerable: true,
     *     configurable: true
     *   },
     *   car: {
     *     value: 'xsaxsasx',
     *     writable: true,
     *     enumerable: true,
     *     configurable: true
     *   }
     *   [Symbol(id)]: { value: 3, writable: true, enumerable: true, configurable: true }
     * }
     */

    /**
     * Копирование объекта вместе с флагами
     */
    {
        let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));
        // console.log(clone === user) // false

        //игнорирует символьные и неперечислимые свойства
        {
            for (let key in user) {
                clone[key] = user[key]
            }
        }
    }
}

// Глобальное запечатывание объекта
// Дескрипторы свойств работают на уровне конкретных свойств.
// Но ещё есть методы, которые ограничивают доступ ко всему объекту:
{
    Object.preventExtensions(obj)
    // Запрещает добавлять новые свойства в объект.
}
{
    Object.seal(obj)
    // Запрещает добавлять/удалять свойства. Также устанавливает configurable: false для всех существующих свойств.
}
{
    Object.freeze(obj)
    // Запрещает добавлять/удалять/изменять свойства.
    // Устанавливает configurable: false, writable: false для всех существующих свойств.
}

//А также есть методы для их проверки:
{
    {
        Object.isExtensible(obj)
        // Возвращает false, если добавление свойств запрещено, иначе true.
    }
    {
        Object.isSealed(obj)
        // Возвращает true, если добавление/удаление свойств запрещено и для всех существующих свойств
        // установлено configurable: false.
    }
    {
        Object.isFrozen(obj)
        // Возвращает true, если добавление/удаление/изменение свойств запрещено,
        // и для всех текущих свойств установлено configurable: false, writable: false.
        // На практике эти методы используются редко.
    }
}

// Проверить Object.freeze Object.seal на вложенном объекта
// Проверить пропсы реакта на свойства