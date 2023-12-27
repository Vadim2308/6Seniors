class MyMap {
    private static instance:MyMap;
    private constructor() {}
    // @ts-ignore
    map: Map<number,string> = new Map();

    clean(){
        // @ts-ignore
        this.map = new Map()
    }

    public static get():MyMap {
        if(!MyMap.instance){
            MyMap.instance = new MyMap()
        }
        return MyMap.instance
    }
}

class Service1 {
    addMap(key:number,value:string){
        const myMap = MyMap.get()
        myMap.map.set(key,value)
    }
}

class Service2 {
    getKeys(key:number){
        const myMap = MyMap.get() // Всегда будет один и тот же инстанс MyMap
        myMap.map.get(key)
        myMap.clean()
    }
}