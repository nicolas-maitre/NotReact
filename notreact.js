import deepMerge from "./deep_merge.js";

let states;
let stateIndex;
let renderContainer;
let initialRootElement;
// let renderedElements;
export const NotReactDom = {
    render(container, rootElement) {
        renderContainer = container;
        initialRootElement = rootElement;
        // renderedElements = [];
        states = [];
        this.refresh();
    },
    refresh() {
        let previousElements = [...renderContainer.children];
        // renderedElements = [];
        stateIndex = 0;
        initialRootElement.render(renderContainer);
        previousElements.forEach((elem) => elem.remove());
    },
};
export const NotReact = {
    createElement(type, props = null, children = []) {
        // console.info("creating element", { type, props, children });
        return {
            render(parentElement) {
                if (typeof type === "function") {
                    let elem = type(props, children);
                    elem.render(parentElement);
                } else {
                    let newElement = document.createElement(type);
                    // renderedElements.push(newElement);
                    if (props) {
                        deepMerge(newElement, props);
                    }
                    parentElement.appendChild(newElement);
                    parentElement = newElement;
                    children.forEach((child) => {
                        if (typeof child === "object" && child.render) {
                            child.render(parentElement);
                        } else {
                            let textNode = document.createTextNode(child);
                            // renderedElements.push(textNode);
                            parentElement.appendChild(textNode);
                        }
                    });
                }
            },
        };
    },
    Fragment({ children }) {},
    useState(initialValue) {
        let thisIndex = stateIndex;
        if (typeof states[thisIndex] === "undefined") {
            states[thisIndex] = initialValue;
        }
        stateIndex++;
        return [
            states[thisIndex],
            (newVal) => {
                states[thisIndex] = newVal;
                NotReactDom.refresh();
            },
        ];
    },
};
export const useState = NotReact.useState;
