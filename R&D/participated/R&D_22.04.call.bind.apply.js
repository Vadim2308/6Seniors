/**
 * Пример с таймаутом, потеря контекст
 */
{
    const obj = {
        name: 'aboba',
        method() {
            console.log(this.name);
        }
    }

    setTimeout(obj.method, 1e3);
    /**
     * Решения
     */
    {
        setTimeout(() => {obj.method()}, 1e3);
        const binded = obj.method.bind(obj);
        setTimeout(binded, 1e3);

    }
}

/**
 * При передаче null / undefined в call(null) apply(null) bind(null) сошлются на Window || GlobalThis
 */

{
    function Test() {
        console.log(...arguments);
    }
    const obj = {
        0: 1,
        1: 3,
        length: 3,
    }
    Test.apply({}, obj); // Принимает псевдомассив || Array
}

{
    function Name() {}

    function Test() {
        Name.call({name: 123}, ...arguments);
        Name.apply({name: 123}, arguments);
    }

}


/**
 * Cобственная имплементация call / apply / bind
 */
{
    function myCall2(ctx, ...args) {
        const fn = this;
        const uniq = Symbol('fn');
        ctx[uniq] = fn;
        const result = ctx[uniq](...args);
        delete ctx[uniq];
        return result;
    }

    function myApply2(ctx, args) {
        const fn = this;
        const uniq = Symbol('fn');
        ctx[uniq] = fn;
        const result = ctx[uniq](...args);
        delete ctx[uniq];
        return result;
    }

    function myBind2(ctx, ...args) {
        const fn = this;
        const uniq = Symbol('fn');
        ctx[uniq] = fn;
        return function (...external) {
            const res = ctx[uniq](...args, ...external);
            delete ctx[uniq];
            return res
        };
    }

    Function.prototype.myCall2 = myCall2;
    Function.prototype.myApply2 = myApply2;
    Function.prototype.myBind2 = myBind2;

    function Test() {
        console.log(this, ...arguments);
    }

    Test.myCall2({ aboba: 3 }, 1, 2, 3); //console.log  === {aboba: 3}, 1, 2, 3
    Test.myApply2({ aboba: 3 }, [1, 2, 3]); //console.log  === {aboba: 3}, 1, 2, 3
    Test.myBind2({ aboba: 3 }, 1, 2, 3)(34); //console.log  === {aboba: 3}, 1, 2, 3
}

