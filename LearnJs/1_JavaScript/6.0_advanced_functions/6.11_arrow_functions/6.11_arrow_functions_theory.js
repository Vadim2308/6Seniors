/**
 * У стрелочных функций нет this, он берется снаружи функции.
 */
{
    let group = {
        title: "Our Group",
        students: ["John", "Pete", "Alice"],
        showList() {
            this.students.forEach(
                student => alert(this.title + ': ' + student)
            );
        }
        // showList() {
        //     this.students.forEach(function(student) {
        //         // Error: Cannot read property 'title' of undefined
        //         alert(this.title + ': ' + student)
        //     });
        // }
    };
    group.showList();
}

/**
 * Стрелочные функции нельзя использовать с new тк у стрелочных функций нет this
 */
{
    const Fn = () => {
        this.name = 'Vadim';
    };
    const name = new Fn();      // TypeError: Fn is not a constructor
}

/**
 * Ей нельзя прибиндить контекст, а аргументы можно
 */
{
    const fn = (a,b) => console.log({a,b})

    fn.bind(null,1)(2) // { a: 1, b: 2 }
}

/**
 * Стрелочные функции не имеют «arguments»
 * Поэтому она идеально подходит для создания декораторов (оберток)
 */

{
    const f = () => {
        console.log(arguments); // ReferenceError: arguments is not defined
    };
    f();
    //-------------//
    function foo() {
        const fn = () => {
            console.log(arguments); // {0: 1}
        };
        fn();
    }
    foo(1);
}


{
    function decorator(fn, ms) {
        return function () {
            setTimeout(() => fn.apply(this, arguments), ms)    // this - стрелка возьмет this из вышестоящей функции
        }
    }
    // То же самое без стрелочной функции выглядело бы так:
    {
        function decorator1(fn, ms) {
            return function () {
                const ctx = this
                setTimeout(function () {
                    return fn.apply(ctx, arguments)
                }, ms)
            }
        }
    }
}

/**
 * У стрелочной функции нет `super` - она обращается к super функции на уровень выше.
 * Подробнее рассмотрено в https://learn.javascript.ru/class-inheritance
 */
{
    class Example {
        method() {
            console.log('test');
        }
    }
    class Example1 extends Example {
        method2() {
            return () => {
                super.method()
            }
            // return function(){
            //     super.method() // ошибка
            // }
        }
    }
    new Example1().method2()()          // Output: 'test'    - работает благодаря тому, что arrow обращается к super у функции выше
}