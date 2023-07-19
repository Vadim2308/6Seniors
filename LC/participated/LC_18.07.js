// Доктор принимает с 9 утра до 9 вечера.
// Часть времени у него занята: приемы, обед, уборка кабинета.
// Свободные слоты:
//      9:00 - 9:30
//      9:30 - 10:00
//      10:00 - 10:30
//      10:50 - 11:20
//      11:20 - 11:50 и т.д.

const busy = [
    {
        start: "10:30",
        stop: "10:50"
    },
    {
        start: "18:40",
        stop: "18:50"
    },
    {
        start: "14:40",
        stop: "15:50"
    },
    {
        start: "16:40",
        stop: "17:20"
    },
    {
        start: "20:05",
        stop: "20:20"
    }
];

const openingTime = "09:00";
const closingTime = "21:00";
const windowDuration = 30; // Длительность свободного окна в минутах

// Функция для конвертации времени в минуты
const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

// Функция для конвертации минут в формат времени "часы:минуты"
const convertToTimeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
};

// Конвертация времени открытия и закрытия в минуты
const openingTimeMinutes = convertToMinutes(openingTime);
const closingTimeMinutes = convertToMinutes(closingTime);

// Создание списка всех доступных окон
const availableWindows = [];
let startTime = openingTimeMinutes;

const sorted = [...busy]
    .map(({ start, stop }) => ({
        start: convertToMinutes(start),
        stop: convertToMinutes(stop)
    }))
    .sort((a, b) => a.start - b.start);

let current = 0;

// Проверка каждого возможного окна
while (startTime + windowDuration <= closingTimeMinutes) {
    let endTime = startTime + windowDuration;

    const pushElem = () => {
        availableWindows.push({
            start: convertToTimeFormat(startTime),
            stop: convertToTimeFormat(endTime)
        });
        startTime += windowDuration;
    }

    if (!sorted[current]) {
        pushElem()
        continue;
    }

    const { start, stop } = sorted[current];

    const isNotAvailable = startTime + windowDuration > start;

    if (isNotAvailable) {
        startTime = stop;
        current++;
    } else {
        pushElem()
    }
}

console.log(availableWindows);