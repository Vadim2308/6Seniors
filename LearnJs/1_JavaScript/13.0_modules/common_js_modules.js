/**
 * Модульная система в node js называется commonJS
 * Но можно и пользоваться ESModule (import/export). Нужно установить "type":"module" в package.json или использовать расширение .mjs
 */
{
    // export файлов
    const variable = 'some'
    const foo = ()=> console.log('foo from c')

    module.exports = {
        variable,
        foo
    }
    // import
    {
        const math = require('some/path/to/file')
        math.foo()
        console.log(math.variable)
    }
}
{
    // Аналог экспорта по дефолту
    module.exports = (...args) => console.log(...args)
    // import
    const logger = require('some/path/to/file')
}
