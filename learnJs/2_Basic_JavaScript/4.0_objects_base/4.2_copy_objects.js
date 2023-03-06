/**
 * Переменная, которой присвоен объект, хранит не сам объект, а его «адрес в памяти» – другими словами, «ссылку» на него.
 * При копировании переменной объекта копируется ссылка, но сам объект не дублируется.
 */
{
    let user = { name: 'John' };
    let admin = user;
    admin.name = 'Pete'; // изменено по ссылке из переменной "admin"
    alert(user.name); // 'Pete', изменения видны по ссылке из переменной "user"
}

/**
 * Cравнение по ссылке
 * Два объекта равны только в том случае, если это один и тот же объект.
 */
{
    let a = {};
    let b = a; // копирование по ссылке
    alert( a == b ); // true, обе переменные ссылаются на один и тот же объект
    alert( a === b ); // true
}
{
    let a = {};
    let b = {}; // два независимых объекта
    alert( a === b ); // false
}
{
    // Если переменная потеряет ссылку на объект, то изменения уже не будут на него влиять
    let user = { name: 'Анна', age: 21 }
    const admin = user

    // Переопределение никак не повлияет на admin, потому что мы создали новый объект
    user = { name: 'Иван' }
    console.log(admin) // { name: 'Анна', age: 21 }

    admin.isAdmin = true

    console.log(user) // { name: 'Иван' }
    console.log(admin) // { name: 'Анна', age: 21, isAdmin: true }

}
/**
 * Cравнение объектов по значению
 */
{
    //С помощью JSON.stringify
    const object1 = {
        title: "Title",
        id: 1
    };
    const object2 = {
        title: "Title",
        id: 1
    };
    const object3 = {
        title: "Another title",
        id: 3
    };
    console.log(JSON.stringify(object1) === JSON.stringify(object2)); // true
    console.log(JSON.stringify(object2) === JSON.stringify(object3)); // false
    console.log(JSON.stringify(object1) === JSON.stringify(object3)); // false

    // Однако у этого метода есть некоторые ограничения. Например, если свойства объектов идут не в одном порядке, то сравнение вернёт false.
    {
        const object1 = {
            title: "Title",
            id: 1
        };
        const object2 = {
            id: 1
            title: "Title",
        };
        console.log(JSON.stringify(object1) === JSON.stringify(object2)); // false
    }

    // С помощью библиотеки lodash
    console.log(_.isEqual(object1, object2)); // true
}

/**
 * Клонирование и объединение
 */
{
    let user = {
        name: "John",
        age: 30
    };
    let clone = {}; // новый пустой объект
    // давайте скопируем все свойства user в него
    for (let key in user) {
        clone[key] = user[key];
    }
    // теперь clone это полностью независимый объект с тем же содержимым
    clone.name = "Pete"; // изменим в нём данные
    alert(user.name); // все ещё John в первоначальном объекте

    // Также мы можем использовать для этого метод Object.assign.
    {
        let user = { name: "John" };

        let permissions1 = { canView: true };
        let permissions2 = { canEdit: true };

        // копируем все свойства из permissions1 и permissions2 в user
        Object.assign(user, permissions1, permissions2);
        // теперь user = { name: "John", canView: true, canEdit: true }
        // Если скопированное имя свойства уже существует, оно будет перезаписано:

        let clone = Object.assign({}, user);
        let clone2 = {...user}
        const clone3 = JSON.parse(JSON.stringify(user))
    }
}

/**
 * Вложенное клонирование
 */
{
    let user = {
        name: "John",
        sizes: {
            height: 182,
            width: 50
        }
    };

    let clone = Object.assign({}, user);
    alert(user.sizes === clone.sizes); // true, тот же объект
    // user и clone обладают общим свойством sizes
    user.sizes.width++;       // изменяем свойства в первом объекте
    alert(clone.sizes.width); // 51, видим результат в другом

    // Cпособы копирования: либо самописное решение,либо _.cloneDeep(obj) из lodash, либо structuredClone()
}