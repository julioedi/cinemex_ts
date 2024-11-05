import { ChangeEvent, Component,ReactNode,PropsWithChildren, ComponentClass  } from "react";
import React from 'react';

    interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: any,
    onChange?:(value:any) => any,
    }

interface props extends HTMLSelectElement{
    children: any,
    [key:string]:any,
}

export default class extends Component<SelectProps>{
    onChange = (e:ChangeEvent) =>{

    }
    render(){
        return(
            <select 
                {...this.props}
                onChange={(e) =>{
                    const {form} = e.target;
                    if (form) {
                        const eventForm = new CustomEvent("onVoChange",{detail:{
                            value:e.target.value,
                            name: e.target.name,
                            event:e,
                        }})
                        // form.dispatchEvent(eventForm);
                    }
                    if (this.props.onChange) {
                        this.props.onChange(e)
                    }

                }}
            >
                {this.props.children}
            </select>
        )
    }
}