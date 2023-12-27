"use strict";
class MyMap {
    constructor() {
        // @ts-ignore
        this.map = new Map();
    }
    clean() {
        // @ts-ignore
        this.map = new Map();
    }
    static get() {
        if (!MyMap.instance) {
            MyMap.instance = new MyMap();
        }
        return MyMap.instance;
    }
}
class Service1 {
    addMap(key, value) {
        const myMap = MyMap.get();
        myMap.map.set(key, value);
    }
}
class Service2 {
    getKeys(key) {
        const myMap = MyMap.get(); // Всегда будет один и тот же инстанс MyMap
        myMap.map.get(key);
        myMap.clean();
    }
}
