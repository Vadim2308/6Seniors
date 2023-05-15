/**
 * Свойства - геттеры и сеттеры
 *  свойства-данные (data properties) все свойства до этой главы
 *  свойства-аксессоры (accessor properties) -  функции, которые используются для присвоения и получения значения, но во внешнем коде они выглядят как обычные свойства объекта.
 *   «геттер» – для чтения
 *    «сеттер» – для записи
 */

{
    let obj = {
        get propName() {
            // геттер, срабатывает при чтении obj.propName
        },

        set propName(value) {
            // сеттер, срабатывает при записи obj.propName = value
        }
    };

    {
        //  Мы не вызываем user.fullName как функцию, а читаем как обычное свойство
        //  Если мы попытаемся назначить user.fullName=, произойдёт ошибка (Т.к. нет сеттера)
        let user = {
            name: "John",
            surname: "Smith",
            get fullName() {
                return `${this.name} ${this.surname}`;
            }
        };
        alert(user.fullName); // John Smith
    }
    {
        let user = {
            name: "John",
            surname: "Smith",

            get fullName() {
                return `${this.name} ${this.surname}`;
            },

            set fullName(value) {
                [this.name, this.surname] = value.split(" ");
            }
        };

        // set fullName запустится с данным значением
        user.fullName = "Alice Cooper";
        alert(user.name); // Alice
        alert(user.surname); // Cooper
    }
}

/**
 * Дескрипторы свойств доступа
 * Свойства-аксессоры не имеют value и writable, но взамен предлагают функции get и set.
 *
 * свойство объекта может быть либо свойством-аксессором (с методами get/set) либо свойством-данным (со значением value)!
 */
{
    let user = {
        name: "John",
        surname: "Smith"
    };
    Object.defineProperty(user, 'fullName', {
        get() {
            return `${this.name} ${this.surname}`;
        },
        //value: 2, Будет ошибка! Invalid property descriptor.
        set(value) {
            [this.name, this.surname] = value.split(" ");
        }
    });
    alert(user.fullName); // John Smith
    for(let key in user) alert(key); // name, surname (т.к. fullName новое свойство)
}

/**
 * Умные геттеры/сеттеры
 * Можно использовать как прокси перед чтением/записью свойств.
 */
{
    let user = {
        get name() {
            if(!this._name){
                return 'Отсутствует имя'
            }
            return this._name;
        },

        set name(value) {
            if (value.length < 4) {
                alert("Имя слишком короткое, должно быть более 4 символов");
                return;
            }
            this._name = value;
        }
    };

    user.name = "Pete";
    alert(user.name); // Pete

    user.name = ""; // Имя слишком короткое...
}

/**
 * Использование для совместимости
 */
{
    // Была функция User
    {
        function User(name, age) {
            this.name = name;
            this.age = age;
        }

        let john = new User("John", 25);

        alert( john.age ); // 25
    }
    // Вместо age решили хранить дату рождения
    {
        function User(name, birthday) {
            this.name = name;
            this.birthday = birthday;
        }

        let john = new User("John", new Date(1992, 6, 1));
    }
    // Cохраняем свойство age и не меняем код, который уже использует age.
    {
        function User(name, birthday) {
            this.name = name;
            this.birthday = birthday;

            // возраст рассчитывается из текущей даты и дня рождения
            Object.defineProperty(this, "age", {
                get() {
                    let todayYear = new Date().getFullYear();
                    return todayYear - this.birthday.getFullYear();
                }
            });
        }

        let john = new User("John", new Date(1992, 6, 1));

        alert( john.birthday ); // доступен как день рождения
        alert( john.age );      // ...так и возраст
    }
}