/**
 * Нужно написать функцию get. На вход принимает объект и путь до поля
 * Путь это строка, разделенная точкой
 */
const ref = {
    a:{
        b:{
            c:"d"
        },
        e:"f"
    }
}

function get(obj,path){
    const splitted = path.split('.') // [a,b,c]
    let target = obj
    for (const el of splitted) {
        target = target[el]
    }
    return target;
}

{
    // Через reduce
    function get(obj,path){
        const splited = path.split('.') // [a,b,c]
        return splitted.reduce((acc,item)=>acc[item],obj)
    }

}

console.log(get(ref,'a.b'))
console.log(get(ref,'a.b.c'))
console.log(get(ref,'a.e'))
