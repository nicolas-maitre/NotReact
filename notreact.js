import {mergeDeep, valuesEqual} from "./utils.js";

let hooks;
let hooksIndex;
let renderContainer;
let initialRootElement;
export const NotReactDom = {
    render(container, rootElement) {
        renderContainer = container;
        initialRootElement = rootElement;
        hooks = [];
        this.refresh();
    },
    refresh() {
        let previousElements = [...renderContainer.children];
        hooksIndex = 0;
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
                    if (props) {
                        mergeDeep(newElement, props);
                    }
                    parentElement.appendChild(newElement);
                    parentElement = newElement;
                    children.forEach((child) => {
                        if (typeof child === "object" && child.render) {
                            child.render(parentElement);
                        } else {
                            let textNode = document.createTextNode(child);
                            parentElement.appendChild(textNode);
                        }
                    });
                }
            },
        };
    },
    Fragment({ children }) {},
    useState(initialValue) {
        let thisIndex = hooksIndex;
        hooksIndex++;
        if (typeof hooks[thisIndex] === "undefined") {
            hooks[thisIndex] = initialValue;
        }
        return [
            hooks[thisIndex],
            (newVal) => {
                hooks[thisIndex] = newVal;
                NotReactDom.refresh();
            },
        ];
    },
    useEffect(callBack, newVal = Math.random()){
        let thisIndex = hooksIndex;
        hooksIndex++;
        if(hooks[thisIndex] && valuesEqual(newVal, hooks[thisIndex].value)){
            return;
        }
        hooks[thisIndex] = {
            value: newVal,
            cleanup: callBack()
        };
    }
};
export const useState = NotReact.useState;
export const useEffect = NotReact.useEffect;