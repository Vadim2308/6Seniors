/**
 * Реализовать EventEmitter, который может добавлять, выключать, вызывать определенные события
 *  on - Регистрирует обработчик для события
 *  off - удаляет обработчик для события
 *  emit - генерирует событие event и передает данные всем зарегистрированным обработчикам
 *
 *  Должно вывести
 *          Handler1: Data 1
 *          Handler2: Data 2
 *          Handler2: Data 4
 */

/**
 * use - cases
 * Идеально подойдет, если в родительском компненте надо вызвать функцию, находщуюся в дочернем компоненте.
 * Не придется ее как то пробрасывать наверх и сохранять в стейте, в родительском компоненте
 */
{
    class EventEmitter {
        #collection = new Map();

        on(key, cb) {
            const listeners = this.#collection.get(key) || [];
            listeners.push(cb);
            this.#collection.set(key, listeners);
            return this;
        }

        emit(key, prop) {
            if (!this.#collection.has(key)) {
                return this;
            }
            const listeners = this.#collection.get(key);
            listeners.forEach((listener) => {
                listener.call(this, prop);
            });
            return this;
        }

        off(key) {
            if (!this.#collection.has(key)) {
                return this;
            }
            this.#collection.delete(key);
            return this;
        }
        emitAll() {
            this.#collection.forEach((listeners) => {
                listeners.forEach((listener) => {
                    listener.call(this);
                });
            });
            return this;
        }
    }

    const emitter = new EventEmitter();

    emitter
        .on('event1', (data) => console.log('Handler1:', data))
        .on('event2', (data) => console.log('Handler2:', data))
        .emit('event1', 'Data 1')
        .emit('event2', 'Data 2')
        .off('event1')
        .emit('event1', 'Data 3')
        .emit('event2', 'Data 4');

}