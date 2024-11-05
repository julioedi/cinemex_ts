import React from "react";
export type SelectPropsElement = JSX.IntrinsicElements['select'];
export interface SelectProps extends HTMLSelectElement{
    initialValue:any,
    realValue:any
}
export type InputPropsElement = JSX.IntrinsicElements['input'];
export type TextAreaPropsElement = JSX.IntrinsicElements['textarea'];