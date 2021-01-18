import { NotReact, NotReactDom, useState } from "./notreact.js";

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

function MainPage(props) {
    const [count, setCount] = useState(12);
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