// Объект на вход
const object = {
    a: {
        d: {
            h: 4
        },
        e: 2
    },
    b: 1,
    c: {
        f: {
            g: 3,
            k: {}
        }
    }
};

const addLevels = (obj,level = 0) => {
    const copy = { ...obj }
    copy.level = level;
    for(let key in copy){
        if(typeof copy[key] === 'object' && obj[key] !== null){
            copy[key] = addLevels(obj[key],level + 1)
        }
    }
    return copy
}

// Данные на выход
/*
updatedObject {
  a: { d: { h: 4, level: 2 }, e: 2, level: 1 },
  b: 1,
  c: { f: { g: 3, 0 level: 2 }, level: 1 },
  level: 0
}*/

// Object { a: { d: { h: 4 }, e: 2 }, b: 1, c: { f: { g: 3, k: {} } } }

console.log(addLevels(object))

console.log(object)