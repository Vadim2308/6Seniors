/**
 * Встроенный объект TextDecoder позволяет декодировать данные из бинарного буфера в обычную строку.
 */
{
    let uint8Array = new Uint8Array([72, 101, 108, 108, 111]); //  Каждый из этих чисел представляет код ASCII-символа соответствующей буквы в английском алфавите.
    alert( new TextDecoder().decode(uint8Array) ); // Hello
}

/**
 * TextEncoder поступает наоборот – кодирует строку в бинарный массив
 */
{
    let encoder = new TextEncoder();

    let uint8Array = encoder.encode("Hello");
    alert(uint8Array); // 72,101,108,108,111
}