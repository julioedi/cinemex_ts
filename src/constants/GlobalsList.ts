import { ReactInstance } from "react";

type formOnEvents = (data: any) => void;

interface formGlobal {
    active: boolean,
    changed: boolean,
    formElement?:ReactInstance,
    events: {
        onSubmit: formOnEvents[],
        onChange: formOnEvents[],
        isActive: formOnEvents[],
    },
}

interface GlobalProps {
    [key: string]: any,
    aside?: HTMLElement | null | undefined,
    Dom: HTMLElement,
    PageTitle: HTMLElement,
    form: formGlobal,
    addFormListener:(key:"onChange"|"onSubmit"|"isActive",fn:formOnEvents) => void,
}
export const GlobalsList: GlobalProps = {
    Dom: document.getElementById('root') as HTMLElement,
    PageTitle: document.querySelector('title') as HTMLElement,
    form: {
        active: false,
        changed: false,
        events: {
            onSubmit: [],
            onChange: [],
            isActive: [],
        },
    },
    addFormListener: (key:"onChange"|"onSubmit"|"isActive",fn:formOnEvents) =>{
        if (!GlobalsList.form.active) return;
        GlobalsList.form.events[key].push(fn);
    }
}