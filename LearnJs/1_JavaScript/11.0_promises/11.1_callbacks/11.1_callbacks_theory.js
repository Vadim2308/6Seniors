/**
 * Многие действия в JavaScript асинхронные.
 * Когда в тело документа добавится конструкция <script src="…">, браузер загрузит скрипт и выполнит его.
 * callback - функция обратного вызова, которая передается как аргумент в другую функцию, и выполняющаяся в определенный момент времени
 */
{
    loadScript('/my/script.js');
    // код, написанный после вызова функции loadScript,
    // не будет дожидаться полной загрузки скрипта

    // --------------------------------------------//
    // Как вариант, использовать callback
    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));
        document.head.append(script); // Как только мы аппендим в DOM этот скрипт, только тогда происходит его выполнение браузером!
    }

    loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
        alert(`Здорово, скрипт ${script.src} загрузился`);
    });



}

/**
 * Колбэк в колбэке
 * Иногда это называют «адом колбэков» или «адской пирамидой колбэков».
 */
{
    const handleError = () => {}
    loadScript('1.js', function(error, script) {
        if (error) {
            handleError(error);
        } else {
            loadScript('2.js', function(error, script) {
                if (error) {
                    handleError(error);
                } else {
                    loadScript('3.js', function(error, script) {
                        if (error) {
                            handleError(error);
                        } else {
                            // ...и так далее, пока все скрипты не будут загружены (*)
                        }
                    });

                }
            })
        }
    });
}

/**
 * Один из вариантов решение это изолирование каждого шага в отдельную функцию
 */
{
    loadScript('1.js', step1);
    const handleError = () => {}
    function step1(error, script) {
        if (error) {
            handleError(error);
        } else {
            loadScript('2.js', step2);
        }
    }

    function step2(error, script) {
        if (error) {
            handleError(error);
        } else {
            loadScript('3.js', step3);
        }
    }

    function step3(error, script) {
        if (error) {
            handleError(error);
        } else {
            // ...и так далее, пока все скрипты не будут загружены (*)
        }
    };
}