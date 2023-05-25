/**
 * В браузерном JavaScript есть некое подобие многопоточности.
 * Не следует путать Web Worker и Service Worker — это разные технологии
 * Он необходим для запуска вычислений параллельно основному потоку, можно юзать если проходят тяжелвые вычисления без падения FPS на странице
 * Пример: https://bespoyasov.ru/blog/web-workers-for-better-performance/
 * UI: https://bespoyasov.ru/showcase/web-workers-for-better-performance/
 * CODE: https://github.com/bespoyasov/web-worker-example
 *
 * LINKS
 *  1. https://www.youtube.com/watch?v=0mw9emMmiJs&t=899s
 *  2. Пример с созданием воркера на лету https://www.youtube.com/watch?v=ZqjDBxt8DYo
 *  3. https://www.youtube.com/watch?v=_wZiKIBzhTw (Также на канале есть видос с хуком для реакта)
 */

/**
 * У web workers свой event-loop
 * Общаются WW и основной поток путем postMessage
 */