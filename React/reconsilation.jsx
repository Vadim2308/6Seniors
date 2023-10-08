import { useEffect, useState } from "react";
import "./styles.css";

const Loader = ({ id }) => {
    useEffect(() => {
        console.log("id", id);
        return () => {
            console.log("unmpunt", id);
        };
    }, []);
    return <div>{id}</div>;
};

const Component = ({ id }) => {
    useEffect(() => {
        console.log("id", id);
        return () => {
            console.log("unmpunt", id);
        };
    }, []);
    return <div>{id}</div>;
};

export default function App() {
    const [checked, setChecked] = useState(true);
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            {/* {checked ? <Loader id="loader" /> : <Component id="component" />} */} Даже если одинаковые компоненты полностью, React удалить прошлый, и замаунтит новый
            {/* {checked ? <Component id="loader" /> : <Component id="component" />} */} Просто поменялся ID, не будет происходит unmount => mount
            {/* {checked ? <Component key='1' id="loader" /> : <Component key='2' id="component" />} */} Т.к. ключ другой, то для реакта это совершенно другой компонент. Будет происходит unmount => mount
            <button onClick={() => setChecked((p) => !p)}>Нажми</button>
        </div>
    );
}


function withAddNode(){
    const [checked, setChecked] = useState(true);

    if (checked) {
        /**
         * Если ПЕРЕД Component появляется новый узел, то происходит unmount
         * Если после, то ничего не происходит
         */
      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          {/*<span>add some node</span>*/}
          <Component id="component" />
          {/* <span>add some node</span> */}
          <button onClick={() => setChecked((p) => !p)}>Нажми</button>
        </div>
      );
    }

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            {/* {checked &&  <span>add some node</span>} */} // Однако это не распространяется на такой синтаксис, хоть и мы не видим false на экрана, и это не React.isValidElement
            <Component id="component" />
            {/* {checked &&  <span>add some node</span>} */}
            <button onClick={() => setChecked((p) => !p)}>Нажми</button>
        </div>
    );
}