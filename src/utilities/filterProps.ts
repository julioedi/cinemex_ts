export default (props:Readonly<any>,keys:string[]) =>{
    const el:{
        [key:string]:any
    } = {...props};
    keys.forEach((i:string) =>{
        delete el[i];
    })
    return el;
}