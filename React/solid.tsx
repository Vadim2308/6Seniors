/**
 * SOLID
 * 1.	Single responsibility — принцип единственной ответственности
 * 2.	Open-closed — принцип открытости / закрытости
 * 3.	Liskov substitution — принцип подстановки Барбары Лисков
 * 4.	Interface segregation — принцип разделения интерфейса
 * 5.	Dependency inversion — принцип инверсии зависимостей
 */

/**
 * S – Single Responsibility (Принцип единственной ответственности)
 * Для каждого класаа, функции, компонента должно быть определено ЕДИНСТВЕННОЕ назначение
 * Если компонент и получает данные, и фильтрует, и выводит, то необходимо его разделять
 * Такой код проще тестировать, расширять, дорабатывать, увеличивается читаемость
 */
{
    /**
     * Плохой компонент. Надо отдельно вынести компонент в <TodoItem/>, отдельно <TodoList todos={todos}/>, и можно в хук useTodos, который получает данные, сетит в стейт, и прокидывает в компонент.
     */
    const TodosPage = () => {
        const [todos,setTodos] = useState()
        useEffect(()=>{
            setTodos(fetch('./getTodos'))
        },[])
        return (
            <div>
                <h1>Todos</h1>
                <ul>
                    {todos.map(todo=><li>{todo.title}</li>)}
                </ul>
            </div>
        )
    }
}

/**
 * Open-closed — принцип открытости / закрытости
 * Код должен быть открыт для добавления новых фич, но без необходимости переписывать существующий функционал.
 * Доработка сущности не должна повлиять на текущую работу системы.
 * В контексте React-приложения - это значит использовать композицию компонентов (это процесс создания новых компонентов путем объединения уже существующих компонентов)
 */
{
    /**
     * Варианты расширения React-компонентов:
     * 1) Дополнительные пропсы
     * 2) Проп children
     *     - утилита Children
     *     - метод CloneElement
     *       Children.map(children,(child,index)=> cloneElement(child,{ prop1:value }))
     * 3) renderProps
     *    <Component someProp={(data)=><h1>{data.title}</h1>}
     * 4) Передача готовой JSX-Разметки
     *    <Component icon={<EmailIcon color="white"/>}
     * 5) Compound components (составные компоненты)
     */

    // 5) Составные компоненты (взято из https://chakra-ui.com/). Т.е. мы наш компонент собираем из различных частей
    <InputGroup size='sm'>
        <InputLeftAddon children='https://' />
        <Input placeholder='mysite' />
        <InputRightAddon children='.com' />
    </InputGroup>
    // --------------------------------------------------- //
    <InputGroup size='md'>
        <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password'/>
        <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
            </Button>
        </InputRightElement>
    </InputGroup>
}

/**
 * 3. Liskov substitution — принцип подстановки Барбары Лисков
 * Базовый компонент имеет определенный интерфейс (пропсы) и ожидаемый функционал (напр. при клике)
 * Подкомпонент (компонент который создается на основе родителя) должен минимально иметь тот же интерфейс и поведение, как у родителя
 *
 * Пример кнопка. У нее есть базовые размеры, и ожидаем что при клике будет что-то происходить
 * Все кнопки, которые создаются на ее основе, должны иметь как минимум такое же поведение как у родителя, ну и плюс его расширять
 * У базовой кнопки есть определенные пропы React.ButtonHTMLAttributes<HTMLButtonElement>. Вот те компоненты, которые создаются, должны иметь все эти атрибуты, плюс еще дополнительные
 */
{
    /**
     * interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     *   variant?:primary | secondary и т.д.
     * }
     */
    const Button = (props) => {
        const { variant,leftIcon,children,...rest} = props
        return <button {...rest}>{leftIcon}{children}</button>
    }
    // --------------------------------------------------- //
    const InputWithAddons = (props) => {
        const { variant,size,leftAddon,rightAddon,...rest} = props
        return (            <InputGroup varian={variant} size={size}>
            <InputLeftAddon children={leftAddon} />
            <Input {...rest} />
            <InputRightAddon children={rightAddon} />
        </InputGroup>

        )
    }
}

/**
 * 4. Interface segregation - много интерфейсов, специально предназначенных для клиентов лучше, чем интерфейс общего назначения
 * Толстые интерфейсы необходимо разделять на более маленькие, и знали только о тех методах, которые необходимы им в работе
 * Изменения родительского компонента (или структуры данных) не должно влиять на дочерние компоненты.
 * Interface segregation призывает нас максимально упрощать интерфейсы для компонентов, чтобы в дальнейшем изменения в приложении не привели к избыточному рефакторингу, а также чтобы сами компоненты были переиспользуемыми.
 */
{
    const user = {
        name:"John",
        age:23,
        color:"blond",
        height:190
    }

    /**
     * Этот компонент должен знать только про имя. Ему не нужен весь user. В случае рефакторинга структуры user, нам просто надо зарефакторить передачу в пропсах.
     * Но при нижестоящем подходе, нам надо еще и рефакторить компонент, например props.info.name и т.д.
     */
    const DisplayUser = (props) => {
        return <div><h1>Hello, {props.user.name}</h1></div>
    }

    <DisplayUser user={user}/>
}

/**
 * 5. Dependency inversion - принцип инверсии зависимостей
 * Модули верхних уровней не должны зависеть от модулей нижних уровней. Оба типа модулей должны зависеть от абстракций
 * Есть зависимость только на абстракции. Мы не завязываемся на что-то конкретное
 */
{
    // Проблема данного кода в том, что мы зависимость например от axios внедряем в компонент. Если мы хотим его поменять например на fetch, то надо рефачить. Также если нам захочется прикрутить другую логику на submit, нам придется как то ухищряться
    import axios from 'axios'
    const LoginForm = () => {
        const handleSubmit = (e) => {
            const formData = new FormData(e.currentTarget)
            axios.post('url',formData)
        }
        return (
            <form onSubmit={handleSubmit}>
                <input type="text"/>
                <input type="text"/>
                <button>Войти</button>
            </form>
        )
    }

    /**
     * Вариантов несколько.
     * 1) Передавать колбеки в компонент. onSubmit. Компонент ничего не значет про детали onSubmit, а просто его вызывает
     * 2) Сделать компонент-обертку, в котором заинжектены некоторые зависимости
     */
    {
        // например
        const ConnectedLoginForm = () => {
            const onSubmit = (data) => {
                axios.post('/someUrl')
            }
            return <LoginForm onSubmit={onSubmit}/>
        }
    }

    /**
     * Пример с классами
     */
    interface MusicApi {
        getTracks:()=>void
    }
    class YandexMusicApi implements MusicApi {
        getTracks(): void {}// Некоторая реализвация, характерная только для YD
    }
    class SpotifyApi implements MusicApi {
        getTracks(): void {}// Некоторая реализвация, характерная только для Spotify
    }
    class VkMusicApi implements MusicApi {
        getTracks(): void {}// Некоторая реализвация, характерная только для Vk
    }
    // Но если мы во всем приложении например везде образаемся к SpotifyApi().getTracks, то при переходе на другой сервис придется рефачить все приложение

    // Грамотнее сделать абстракцию, которая принимает клиент, и реализует нужны методы.
    // И сюда можно поместить какие-то методы, которые должны вызываться вне зависимости от типа, например отправка в sentry и т.д.
    class MusicClient implements MusicApi {
        client:MusicApi
        constructor(client:MusicApi) {
            this.client = client
        }

        getTracks(): void {
            this.client.getTracks()
        }

    }
    const MusicApp = () => {
        const API:MusicApi = new MusicClient(new SpotifyApi())
        // Мы в любой момент можем поведение это изменить, например new MusicClient(new YandexMusicApi())
    }
}

{
    // Композиция компонентов представляет собой удобный подход, для проектирования разнообразных интерфейсов, которые должны отрисовываться по определенным условиям
    // https://www.youtube.com/watch?v=4BByJUk5x7M
    const LoginInput = () => {
        const { value } = useCtx();
        return <input placeholder={`LoginInput input ${value}`} />;
    };
    const CardInput = () => {
        const { value } = useCtx();
        return <input placeholder={`Card input ${value}`} />;
    };

    // @ts-ignore
    const Ctx = createContext(null);

    const useCtx = () => {
        // @ts-ignore
        const ctx = useContext(Ctx);
        if (!ctx) {
            throw new Error('err');
        }
        return ctx;
    };

    function AuthForm({children}) {
        return (
            <Ctx.Provider value={{ value: 1 }}>

                {children}
            </Ctx.Provider>
        );

    }
    AuthForm.LoginInput = LoginInput;
    AuthForm.CardInput = CardInput;
    export default AuthForm;

   //=====================================//
    const AuthByCard = () => {
        //  Непосредственно сама композиция
        // @ts-ignore
        return <AuthForm>
                   <AuthForm.LoginInput />
                   <AuthForm.CardInput />
              </AuthForm>
    }

    const AuthByPhone = () => {
        // @ts-ignore
        return <AuthForm>
            <AuthForm.LoginInput />
        </AuthForm>
    }

}