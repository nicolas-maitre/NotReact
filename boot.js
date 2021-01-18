import { NotReact, NotReactDom, useState, useEffect } from "./notreact.js";

const App = ({ myName }) =>
    // NotReact.createElement(NotReact.Fragment,{},[])
    NotReact.createElement("div", {}, [
        NotReact.createElement("h1", { style: { backgroundColor: "gray" } }, [
            "Bonjour à ",
            myName,
            " !!!",
        ]),
        NotReact.createElement(MainPage),
    ]);

function MainPage() {
    const [count, setCount] = useState(12);
    useEffect(()=>{
        console.log("every time...");
    });
    useEffect(()=>{
        console.log("when new decade...");
    }, Math.floor(count/10));
    useEffect(()=>{
        console.log("only once...");
    }, []);
    
    return NotReact.createElement("div", { id: "main-page" }, [
        NotReact.createElement("p", null, ["counter:", count]),
        NotReact.createElement(
            "button",
            { onclick: (evt) => setCount(count + 1) },
            ["Click me!"]
        ),
    ]);
}

NotReactDom.render(
    document.getElementById("myContainer"),
    NotReact.createElement(App, { myName: "Nicolas" })
);