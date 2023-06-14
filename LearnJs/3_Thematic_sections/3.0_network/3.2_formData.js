/**
 * Объекты FormData может помочь с отправкой HTML-форм: с файлами и без, с дополнительными полями и т.д.
 */

/**
 * let formData = new FormData([form]);
 * Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля.
 * fetch позволяет указать объект FormData в body, и при запросе автоматом подставится заголовок Content-Type: multipart/form-data
 */

/**
 * Методы FormData
 *      formData.append(name, value) – добавляет к объекту поле с именем name и значением value,
 *      formData.append(name, blob, fileName) – добавляет поле, как будто в форме имеется элемент <input type="file">, третий аргумент fileName устанавливает имя файла (не имя поля формы), как будто это имя из файловой системы пользователя,
 *      formData.delete(name) – удаляет поле с заданным именем name,
 *      formData.get(name) – получает значение поля с именем name,
 *      formData.has(name) – если существует поле с именем name, то возвращает true, иначе false
 *      formData.set - похож на append, но только удаляет все имеющееся поля с именем name, и добавляет новое, уникальное
 */

/**
 * for..of
 * Можно перебрать циклом нашу форму
 */
{
    let formData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');

    // Список пар ключ/значение
    for(let [name, value] of formData) {
        alert(`${name} = ${value}`); // key1=value1, потом key2=value2
    }
}

/**
 * FormData as Object
 * Можно представить  FormData как объект
 */
{
    const formData = new FormData()
    const formDataAsObject = Object.fromEntries(formData)
}

/**
 * FormData as URLParams
 * Если нужно данные из FormData использовать как query params, можно сделать так
 */

{
    const formData = new FormData()
    const params = new URLSearchParams()
    for(let [k,v] of formData){
        params.append(k,v)
    }
    console.log(result.toString())
}

/**
 * Отправка формы с файлом
 */
{
    // <form id="formElem">
    //     <input type="text" name="firstName" value="John">
    //     Картинка: <input type="file" name="picture" accept="image/*">
    //     <input type="submit">
    // </form>
    //
    // <script>
        formElem.onsubmit = async (e) => {
        e.preventDefault();

        let response = await fetch('/article/formdata/post/user-avatar', {
        method: 'POST',
        body: new FormData(formElem)
    });

        let result = await response.json();

        alert(result.message);
    };
    // </script>
}

/**
 * Отправка формы с Blob-данными
 */
{
    // <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
    //
    // <input type="button" value="Отправить" onClick="submit()">
    //
    //     <script>
            canvasElem.onmousemove = function(e) {
            let ctx = canvasElem.getContext('2d');
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        };

            async function submit() {
            let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

            let formData = new FormData();
            formData.append("firstName", "John");
            formData.append("image", imageBlob, "image.png"); // Равносильно если бы пользователь бы файл с именем "image.png" (3-й аргумент) и данными imageBlob (2-й аргумент) из своей файловой системы.

            let response = await fetch('/article/formdata/post/image-form', {
            method: 'POST',
            body: formData
        });
            let result = await response.json();
            alert(result.message);
        }
        //
        // </script>
}