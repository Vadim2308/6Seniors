/**
 * Garbage collector
 *
 */
{
   // в user находится ссылка на объект
    let user = {
        name: "John"
    };
    // Глобальная переменная user ссылается на объект {name: "John"}
    // Если перезаписать значение user, то ссылка потеряется:
    user = null;
    // Теперь объект John становится недостижимым. К нему нет доступа, на него нет ссылок. Сборщик мусора удалит эти данные и освободит память.
}
{
    // Две ссылки
    // в user находится ссылка на объект
    let user = {
        name: "John"
    };
    let admin = user;

    user = null;
    // Объект John всё ещё достижим через глобальную переменную admin, поэтому он находится в памяти.
    // Если бы мы также перезаписали admin, то John был бы удалён.
}

/**
 * Основной алгоритм сборки мусора называется «алгоритм пометок» (от англ. «mark-and-sweep»).
 */