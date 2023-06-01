/**
 * @https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Typed_arrays
 * Типизированные массивы в JavaScript являются массивоподобными объектами, предоставляющими механизм доступа к сырым двоичным данным.
 * Как вы уже можете знать, массив Array растёт и обрезается динамически, и может содержать элементы любого типа JavaScript.
 * Благодаря оптимизациям JavaScript движков, массивы остаются быстрыми.
 * Однако, со временем, веб-приложения становятся все более и более мощными, появляется необходимость работы с аудио- и видео-данными, требуется доступ к сырым данным WebSocket, и так далее.
 * Становится очевидным, что возможность быстрой и эффективной работы с двоичными данными в JavaScript будет очень полезной, для чего типизированные массивы и предназначены.
 */

/**
 *  Объект для работы с бинарными данными имеет тип ArrayBuffer и представляет собой ссылку на непрерывную область памяти фиксированной длины.
 */
{
    let buffer = new ArrayBuffer(16); // Инструкция выделяет непрерывную область памяти размером 16 байт и заполняет её нулями.
    alert(buffer.byteLength); // 16

    // 1. Длина фиксирована, мы не можем увеличивать или уменьшать её.
    // 2. ArrayBuffer занимает ровно столько места в памяти, сколько указывается при создании.
    // 3. Для доступа к отдельным байтам нужен вспомогательный объект-представление, buffer[index] не сработает
}

/**
 * Для заполнения буфера числами надо использовать специальные объекта
 *      Uint8Array – 1 байт занимает 1 число. Числа в промежутке от 0 до 255
 *      Uint16Array - 2 байта занимает 1 число. Числа в промежутке от 0 до 65535
 *      Uint32Array - 4 байта занимают 1 число. Числа в промежутке от 0 до 4294967295
 *      Float64Array - 8 байт занимают 1 число. Числа с плавающей точкой в промежутке от 5.0x10-324 до 1.8x10308.
 */
{
    let buffer = new ArrayBuffer(16); // создаётся буфер длиной 16 байт
    let view = new Uint32Array(buffer); // интерпретируем содержимое как последовательность 32-битных целых чисел без знака
    alert(Uint32Array.BYTES_PER_ELEMENT); // 4 байта на каждое целое число
    alert(view.length); // 4, именно столько чисел сейчас хранится в буфере
    alert(view.byteLength); // 16, размер содержимого в байтах
    // давайте запишем какое-нибудь значение
    view[0] = 123456;

// теперь пройдёмся по всем значениям
    for(let num of view) {
        alert(num); // 123456, потом 0, 0, 0 (всего 4 значения)
    }
}
/**
 * https://www.youtube.com/watch?v=tTNcqxbxhfY
 * Типизированные массивы дают нужную производительность при обработке видео звука, сетевых пакетов, рендерить графики т.д.
 * Поэтому ввесли типизированные массивы, которые могут быстро работать с этим
 * BufferArray - выделенная память. Просто выделяет место в памяти, но доступ к ней не дает
 * DataView - связан с BufferArray и позволяет достучаться до этой памяти. Uint8Array и т.д.
 * Есть несколько DataView. Они позволяют читать/писать в память
 */

// ArrayBuffer
{
    const arrayBuffer = new ArrayBuffer(10) // Просто выделяем память размеров 10 байт. Пока ниче делать мы с ней не можем
    console.dir(arrayBuffer); // ArrayBuffer { byteLength: 10 }
    console.log(arrayBuffer.byteLength); // 10
    console.log(typeof arrayBuffer); // Object
    console.log(arrayBuffer instanceof ArrayBuffer); // true
    console.log(Object.getPrototypeOf(arrayBuffer).constructor.name); // ArrayBuffer

    const ui8a = new Uint8Array();
    console.log(ArrayBuffer.isView(ui8a)); // true Позволяет узнать, является ли эта константа возможным View к ArrayBuffer
    console.log(ArrayBuffer.isView([])); // false
}

/**
 * DataView специальное супергибкое нетипизированное представление данных из ArrayBuffer
 * доступ к данным осуществляется посредством методов типа .getUint8(i) или .getUint16(i)
  */

{
    const len = 1024; // 1кб
    const buffer = new ArrayBuffer(len);
    const view1 = new DataView(buffer);
    const view2 = new DataView(buffer, 8, 24); // view 24 bytes from offset 8
    const view3 = new DataView(buffer, 128, 16); // view 16 bytes from offset 128

    for (let i = 0; i < len; i++) {
        const value = (i + 7) * 5;
        view1.setUint8(i, value); // также есть другие методы для записи
    }

    console.dir({ view1, view2, view3 });
}


/**
 * TypedArray - общий термин для всех таких представлений (Uint8Array, Uint32Array и т.д.)
 * Они похожи на массивы, они имеют проиндексированные элементы, по ним можно итерироваться
 * Позволяют обращаться к буфферу как к обычному типизированному массиву
 */
{
    const types = [
        Int8Array, Uint8Array, Uint8ClampedArray,
        Int16Array, Uint16Array,
        Int32Array, Uint32Array,
        Float32Array,
        Float64Array
    ];

    const size = types.map((typedArray) => typedArray.BYTES_PER_ELEMENT);

    console.dir({
        types,
        size
    }); // Выведет сколько байт на элемент выделяется
}

// Методы
{
    // map
    {
        const arr8 = new Int8Array(10);

        for (let i = 0; i < 10; i++) {
            arr8[i] = i;
        }
        const mapped = arr8.map((el) => el * 2); // map отдаст также Int8Array
        console.dir(mapped);
        console.dir([
            arr8.indexOf(2),
            arr8.lastIndexOf(10),
            arr8.reverse(),
            arr8.slice(2, 7),
        ]);
    }
    // reduce
    {
        const arr8 = new Int8Array(10);
        for (let i = 0; i < 10; i++) {
            arr8[i] = i;
        }
        const reduced = arr8.reduce((acc, el) => acc + el);
        console.dir({
            reduced, // 45
            type: typeof reduced, // "number"
        });
    }
    // subarray - тоже самое что и slice
    {
        const uint8 = new Uint8Array([10, 20, 30, 40, 50]);
        console.log(uint8.subarray(1, 3)); // Expected output: Uint8Array [20, 30]
        console.log(uint8.subarray(1)); // Expected output: Uint8Array [20, 30, 40, 50]

    }
    // fromBuffer
    {
        const buffer = new ArrayBuffer(10);

        const ai8 = new Int8Array(buffer); // цепляем 2 типизированных массив на одну и ту же область памяти, и смотрим какие числа там лежат
        const au16 = new Uint16Array(buffer);

        console.dir({
            ai8,
            au16
        });

        for (let i = 0; i < ai8.length; i++) {
            ai8[i] = i;
        }

        console.dir({
            ai8, // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            au16 // [256, 770, 1284, 1798, 2312] ??
        });
    }
    // также есть остальные методы, чекнуть можно в конце видео
}