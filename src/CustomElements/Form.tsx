import { ChangeEvent, ChangeEventHandler, Component, FormEvent } from "react";
import filterProps from "../utilities/filterProps";
import { GlobalsList } from "../constants/GlobalsList";


interface changeValue{
    name: string,
    value:string,
    changed:boolean,
}

interface onChangeFormData{
    current: changeValue,
    changed: boolean,
    data: InitialData,
    [key:string]: any,
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children?: any,
    onChange?: (value: any) => any,
    initialData?: {}
    allowChange?:boolean,
}
type InitialData = {
    [key: string]: any
};


export default class extends Component<FormProps> {
    constructor(props:FormProps){
        super(props);
        //pevent to autoupdate props;
        if (this.props?.initialData) {
            this.currentData = {...this.props?.initialData};
            this.defaultData = {...this.props?.initialData}
            this.realData = {...this.props?.initialData}
        }
        
    }
    /**
     * Modified Data
     */
    currentData: InitialData =  {}
    /**
     * Modified Data
     */
    realData: InitialData = {}

    /**
     * Initial state data
     */
    defaultData: InitialData = {}

    nodeNames: string[] = [
        "INPUT",
        "SELECT",
        "TEXTAREA",
    ];

    customEvents:boolean = true;
    form: HTMLFormElement | null = null;
    checkChange = (target: HTMLFormElement) => {
        const { nodeName } = target;
        if (!this.nodeNames.includes(nodeName)) return null;
        this.currentData[target.name] = target.value;
        this.allFormData();
        const data:changeValue = {
            name: target.name,
            value: target.value,
            changed: this.defaultData[target.name] != target.value
        }
        this.setData(target.name,target.value);
        return data;
    }
    allFormData = () => {
        if (!this.form) return;
        const FormPops = new FormData(this.form);

        const data  = FormPops.entries();
        var obj = data.next();
        const retrieved:InitialData = {};
        while (undefined !== obj.value) {
            retrieved[obj.value[0]] = obj.value[1];
            obj = data.next();
        }
        this.currentData = retrieved;
        if (this.props.allowChange) {
            this.realData = this.currentData;
        }
    }
    compare = () =>{
        const current = this.props.allowChange ? this.currentData : this.realData;
        const isChanged = JSON.stringify(current) !== JSON.stringify(this.defaultData);
        return isChanged;
    }

    setData = (name:string,value:any) =>{
        this.realData[name] = value;
    }

    changedKeys = (oldObj:InitialData,newObj:InitialData) =>{
        const finalObj:InitialData = {}
        for (const key in newObj) {
            if ( !(key in oldObj) ){
                finalObj[key] = newObj[key];
            }
            else if ( JSON.stringify({data:oldObj[key]}) !== JSON.stringify({data:newObj[key]}) ){
                finalObj[key] = newObj[key];
            }
        }
        return finalObj;
    }

    SubmitForm = (e:FormEvent) =>{
        e.preventDefault();
        const data = {
            ...this.currentData,
            ...this.realData,
        }
        const finalData = {
            new: data,
            old: this.defaultData,
            changed: this.changedKeys(this.defaultData,data),
        }
        return finalData;
    }
    submit = () =>{
        this.form?.submit();
    }

    componentDidMount(): void {
        GlobalsList.form ={
            active:true,
            changed:false,
            formElement: this,
            events:{
                onSubmit:[],
                onChange:[],
                isActive:[],
            },
        }
    }
    componentWillUnmount(): void {
        this.customEvents = false;
        GlobalsList.form ={
            active:false,
            changed:false,
            events:{
                onSubmit:[],
                onChange:[],
                isActive:[],
            },
        }
    }


    doAllEvents  = (key:"onChange"|"onSubmit"|"isActive",data:any) =>{
        const customEvent = new CustomEvent(`vo_${key}`,{
            detail: data
        })
        document.dispatchEvent(customEvent);
    }

    render() {
        const props = filterProps(this.props, ["onChange","initialData","allowChange"])
        return (
            <form
                {...props}
                ref={(ref) => {
                    this.form = ref;
                }}
                onSubmit={this.SubmitForm}
                onChange={(e) => {
                    if (!this.form) return null;
                    const { target } = e;
                    const changed = this.checkChange(target as HTMLFormElement);
                    if (!changed) return null;
                    const data:onChangeFormData = {
                        current: changed,
                        changed: this.compare(),
                        data: this.currentData,
                        init: this.defaultData
                    }
                    // this.doAllEvents("onChange",data);
                    const ChangeEvent = new CustomEvent("vo_isActive",{
                        detail: data.changed,
                    });

                    window.dispatchEvent(ChangeEvent);

                    if (this.props?.onChange) {
                        this.props.onChange(data);
                    }
                }}
            >
                {this.props.children}
            </form>
        )
    }
}