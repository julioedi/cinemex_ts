import { apiBase } from "../constants";
import {
    defaultSingleMinProps,
    defaultSingleProps,
    defaultTableListProps,
    singleComplex,
    singleMenu,
    singleProduct,
    singleSection
} from "../constants/types";

interface SingleEditProp {
    code: string,
    id: number | string,
    options?: object
}

interface singleGeneralData extends defaultSingleProps{
    [key:string]:any
}
interface singleGeneralProps{
    data:singleGeneralData,
    list?:{
        [key:string]:defaultSingleMinProps|string|{}
    }
}


class CoreApi {
    uri = apiBase;

    async fetch(path: string, options: {} = {}) {
        const route = `${this.uri}/${path}`;
        const data = await fetch(route)
            .then(data => data.json())
            .then(data => {
                if (data?.data?.error) {
                    Object.assign(data, {
                        error: true,
                    })
                }
                return data;
            })
            .catch(err => {
                const obj: [] = [];
                Object.assign(obj, {
                    error: true,
                });
                return obj;
            })
        return data;

    }

    async getTableData(path: string) {
        const data: defaultTableListProps = await this.fetch(path);
        return data;
    }
    async getSingle(element: SingleEditProp) {
        const uri = `${element.code}/${element.id}`;
        const data = await this.fetch(uri);
        if ("error" in data) return data;
        switch (element.code) {
            case "complex":
                return <singleComplex>{ ...data }
                break;
            case "menus":
                return <singleMenu>{ ...data }
                break;
            case "menus":
                return <singleSection>{ ...data }
                break;
            case "menus":
                return <singleProduct>{ ...data }   
                break;
            default:
                break;
        }
        return<singleGeneralProps>{...data};    

    }
}

const API = new CoreApi();
export default API;