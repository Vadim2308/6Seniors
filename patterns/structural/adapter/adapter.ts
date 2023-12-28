/**
 * Позволяет адаптировать какой-то неподходящий объект к использованию в нашей среде
 * Например переходник с jack3.5 на type-c, чтоб наушники могли работать с айфоном))
 *
 * Допустим у нас есть большая функция run, которая уже работает с базой данных, KVDataBase
 * Приходит заказчик, и говорит что надо добавить новую базу, но у нее совершенно другой API (PersistentDB)
 * Делается адаптер. В нем те же методы, которые есть в KVDataBase, но реализация внутри уже исходя из нового API
 *
 */

class KVDataBase {
    // @ts-ignore
    private db:Map<string,string> = new Map()
    save(key:string,value:string){
        this.db.set(key,value)
    }
}

class PersistentDB {
    savePersistent(data:Object){
        console.log(data)
    }
}

class PersistentDBAdapter extends KVDataBase {
    constructor(public database: PersistentDB) {
        super();
    }

    override save(key: string, value: string) {
        this.database.savePersistent({ key,value })
    }
}

// Использование
function run(base:KVDataBase){
    base.save('key','myValue')
}

run(new PersistentDBAdapter(new PersistentDB()))