/**
 * Опциональная цепочка ?. — это безопасный способ доступа к свойствам вложенных объектов, даже если какое-либо из промежуточных свойств не существует.
 */
{
    let user = {}; // пользователь без свойства "address"
    console.log(user.address.street); // Ошибка!
}
/**
 * Опциональная цепочка ?. немедленно останавливает вычисление и возвращает undefined, если значение перед ?. равно undefined или null.
 */
{
    let user = {}; // пользователь без адреса
    console.log( user?.address?.street ); // undefined (без ошибки)
}
{
    let user = null;
    console.log( user?.address ); // undefined
    console.log( user?.address.street ); // undefined
}
{
    let user = null;
    let x = 0;
    user?.sayHi(x++); // нет "user", поэтому выполнение не достигает вызова sayHi и x++
    console.log(x); // 0, значение не увеличилось
}

/**
 * Опциональная цепочка работает только с объявленными переменными
 */
{
    user?.street // ReferenceError : user is nor defined
}

/**
 * Опциональная цепочка ?. — специальная синтаксическая конструкция, которая также работает с функциями и квадратными скобками.
 */

/**
 * Например, ?.() используется для вызова функции, которая может не существовать.
 */
{
    let userAdmin = {
        admin() {
            console.log("Я админ");
        }
    };
    let userGuest = {};
    userAdmin.admin?.(); // Я админ
    userGuest.admin?.(); // ничего не произойдет (такого метода нет)
}
/**
 * Синтаксис ?.[] также работает, если мы хотим использовать скобки [] для доступа к свойствам вместо точки ..
 */
{
    let key = "firstName";
    let user1 = {
        firstName: "John"
    };

    let user2 = null;

    console.log( user1?.[key] ); // John
    console.log( user1["firstName"]?.car ); // undefined
    console.log( user2?.[key] ); // undefined
}

/**
 * Также мы можем использовать ?. с delete:
 * Позволяет безопасно удалять свойства из объекта. Если undefined, то до удаления дело не дойдет
 */
{
    let user = {
        name: "John"
    };
    delete user?.name; // удаляет user.name если пользователь существует

    // Мы можем использовать ?. для безопасного чтения и удаления, но не для записи
    {
        let user = null;
        user?.name = "John"; // Ошибка, не работает. То же самое что написать undefined = "John"
    }
}

/**
 * Синтаксис опциональной цепочки ?. имеет три формы:
 *
 * obj?.prop – возвращает obj.prop если obj существует, в противном случае undefined.
 * obj?.[prop] – возвращает obj[prop] если obj существует, в противном случае undefined.
 * obj.method?.() – вызывает obj.method(), если obj.method существует, в противном случае возвращает undefined.
 */