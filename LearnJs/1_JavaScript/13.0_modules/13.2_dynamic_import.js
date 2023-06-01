/**
 * Выражение import(module) загружает модуль и возвращает промис, результатом которого становится объект модуля, содержащий все его экспорты.
 */
{
    let modulePath = prompt("Какой модуль загружать?");
    import(modulePath)
        .then((module)=>/*тут объект модуля*/)
        .catch(console.error)
}
// Если именованный экспорт
{
    // 📁 say.js
    export function hi() {
        alert(`Привет`);
    }
    export function bye() {
        alert(`Пока`);
    }
    // ---------------------------- //
    (async ()=>{
        let {hi, bye} = await import('./say.js');
        hi();
        bye();
    })()
}
// Если экспорт по умолчанию
{
    // 📁 say.js
    export default function() {
        alert("Module loaded (export default)!");
    }
    // ---------------------------- //
    let obj = await import('./say.js');
    let say = obj.default;
    // или, одной строкой: let {default: say} = await import('./say.js');
    say();
}