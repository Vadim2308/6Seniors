/**
 *  Intl.Collator - Умеет правильно сравнивать и сортировать строки.
 *  Intl.DateTimeFormat - Умеет форматировать дату и время в соответствии с нужным языком. (см 5.11)
 *  Intl.NumberFormat - Умеет форматировать числа в соответствии с нужным языком.
 */

/**
 * Строки, Intl.Collator
 * Объект Intl.Collator является конструктором сортировщиков — объектов, включающих языка-зависимое сравнение строк.
 */
{
    let collator = new Intl.Collator();

    alert( "ёжик" > "яблоко" ); // true (ёжик больше, что неверно)
    alert( collator.compare("ёжик", "яблоко") ); // -1 (ёжик меньше, верно)
}

/**
 * Числа, Intl.NumberFormat
 * Форматтер Intl.NumberFormat умеет красиво форматировать не только числа, но и валюту, а также проценты.
 *
 * let formatter = new Intl.NumberFormat([locales[, options]]);
 * formatter.format(number); // форматирование
 */
{
    let formatter = new Intl.NumberFormat("ru");
    alert( formatter.format(1234567890.123) ); // 1 234 567 890,123

    let formatter2 = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2
    });

    alert( formatter2.format(1234.5) ); // 1 234,50 £

    // Форматирование процентов
    {
        const value = 0.851;

        const en = new Intl.NumberFormat("en", {style: "percent", minimumFractionDigits: 2}).format(value);
        const ru = new Intl.NumberFormat("ru", {style: "percent", minimumFractionDigits: 2}).format(value);

        console.log(en);    // 85.10%
        console.log(ru);    // 85,10 %
    }

    // Форматирование валюты
    {
        const value = 85.1;

        const usd = new Intl.NumberFormat("ru", {style: "currency", currency: "USD"}).format(value);
        const euro = new Intl.NumberFormat("ru", {style: "currency", currency: "EUR"}).format(value);
        const rub = new Intl.NumberFormat("ru", {style: "currency", currency: "RUB"}).format(value);

        console.log(usd);   // 85,10 $
        console.log(euro);  // 85,10 €
        console.log(rub);   // 85,10 ₽
    }

    // Форматирование единиц измерения
    {
        const value = 85;

        const kilobyte = new Intl.NumberFormat("ru", {style: "unit", unit: "kilobyte", unitDisplay: "long"}).format(value);
        const meter = new Intl.NumberFormat("ru", {style: "unit", unit: "meter", unitDisplay: "long"}).format(value);
        const gram = new Intl.NumberFormat("ru", {style: "unit", unit: "gram", unitDisplay: "long"}).format(value);

        console.log(kilobyte);  // 85 килобайт
        console.log(meter);     // 85 метров
        console.log(gram);      // 85 грамм
    }
}