/**
 * Добавьте toString в словарь
 * Добавьте ему метод dictionary.toString(), который должен возвращать список ключей, разделённых запятой.
 * Ваш toString не должен выводиться при итерации объекта с помощью цикла for..in.
 */
{
    let dictionary = Object.create(null);

    // ваш код, который добавляет метод dictionary.toString
    Object.defineProperty(dictionary,"toString",{
        value(){
            return Object.keys(this).join(',')
        }
    })

// добавляем немного данных
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

    // только apple и __proto__ выведены в цикле
    for(let key in dictionary) {
        console.log(key); // "apple", затем "__proto__"
    }

    // ваш метод toString в действии
    console.log(String(dictionary)); // "apple,__proto__"
}

/**
 * Разница между вызовами
 */
{
    function Rabbit(name) {
        this.name = name;
    }
    Rabbit.prototype.sayHi = function() {
        alert(this.name);
    };

    let rabbit = new Rabbit("Rabbit");

    rabbit.sayHi(); // "Rabbit" this === {name:"Rabbit"}
    Rabbit.prototype.sayHi(); // undefined this === { sayHi: [Function (anonymous)], constructor:Rabbit }
    Object.getPrototypeOf(rabbit).sayHi(); // undefined { sayHi: [Function (anonymous)], constructor:Rabbit }
    rabbit.__proto__.sayHi(); // undefined this === { sayHi: [Function (anonymous)] }

    // Но если в прото добавить имя, будетп о другому
    {
        Rabbit.prototype.name = 'customName'

        Rabbit.prototype.sayHi(); // 'customName'
        Object.getPrototypeOf(rabbit).sayHi(); // 'customName'
        rabbit.__proto__.sayHi(); // 'customName'
    }
}
