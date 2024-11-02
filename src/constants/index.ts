export type canString = string|undefined;
export type canNumber = number|undefined;
interface wpMediaFunctionProps{
    title?:canString,
    button?:undefined|{
        text:string
    },
    multiple?:boolean,
    library?:undefined|object,
    [key:string]:any
}

interface wpMediaProps{
    on:Function,
    open:Function,
    close:Function,
    state:Function
}
declare global {
    interface Window {
        apiBase:string;
        basePath:string;
        wp:{
            media: Function
        }
    }
}

const {apiBase,basePath} = window;
const media = window.wp;

const editClassnames = {
    aside: "aside_wrap",
    content: "content_wrap"
}

export {apiBase,basePath,media,editClassnames};