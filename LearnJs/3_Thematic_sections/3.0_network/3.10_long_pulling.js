/**
 * Длинные опросы – это самый простой способ поддерживать постоянное соединение с сервером, не используя при этом никаких специфических протоколов (типа WebSocket или Server Sent Events).
 */

/**
 * Cхема работы
 *      Запрос отправляется на сервер.
 *      Сервер не закрывает соединение, не отвечает. пока у него не возникнет сообщение для отсылки. // pending
 *      Когда появляется сообщение – сервер отвечает на запрос, посылая его.
 *      Браузер немедленно делает новый запрос.
 */

// Пример на React
{
    const LongPulling = () => {
        const [messages, setMessages] = useState([]);
        const [value, setValue] = useState('');


        useEffect(() => {
            subscribe()
        }, [])

        const subscribe = async () => {
            try {
                const {data} = await axios.get('http://localhost:5000/get-messages')
                setMessages(prev => [data, ...prev])
                await subscribe()
            } catch (e) {
                setTimeout(() => {
                    subscribe()
                }, 500)
            }
        }

        const sendMessage = async () => {
            await axios.post('http://localhost:5000/new-messages', {
                message: value,
                id: Date.now()
            })
        }

        return (
            <div className="center">
                <div>
                    <div className="form">
                        <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                        <button onClick={sendMessage}>Отправить</button>
                    </div>
                    <div className="messages">
                        {messages.map(mess =>
                            <div className="message" key={mess.id}>
                                {mess.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

export default LongPulling;
}
// Node.js
{
    const express = require('express');
    const cors = require('cors');
    const events = require('events')
    const PORT = 5000;

    const emitter = new events.EventEmitter();

    const app = express()

    app.use(cors())
    app.use(express.json())

    app.get('/get-messages', (req, res) => {
        emitter.once('newMessage', (message) => {
            res.json(message)
        })
    })

    app.post('/new-messages', ((req, res) => {
        const message = req.body;
        emitter.emit('newMessage', message)
        res.status(200)
    }))


    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}