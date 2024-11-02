import { Location,NavigateFunction,useParams } from "react-router-dom"

export type onClick = (e:any) => any | undefined;
export interface CoreComponentRouterProps extends JSX.IntrinsicElements{
    params:{[key:string]:any},
    location:Location,
    navigate:NavigateFunction
}