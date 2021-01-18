export const NotReactDom = {
    render(container, ){
        container.innerText = "hi";
    }
};
export const NotReact = {
    createElement(type, props=null, children=[]){
        console.info("creating element", {type,props,children})
    },
    Fragment({children}){
        return [children]
    }
};