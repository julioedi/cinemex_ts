import { ComponentClass } from "react";
import { Location, NavigateFunction, useParams } from "react-router-dom"

export type onClick = (e: any) => any | undefined;
export interface CoreComponentRouterProps extends JSX.IntrinsicElements {
    params: { [key: string]: any },
    location: Location,
    navigate: NavigateFunction
}

export interface CoreComponentRouterClass extends ComponentClass {
    params: { [key: string]: any },
    location: Location,
    navigate: NavigateFunction
}


export interface defaultSingleProps {
    ID: number,
    author?: number,
    created?: string,
    created_by?: number,
    updated?: string,
    updated_by?: string,
    title?: string,
    slug?: string,
    status?: number,
    content?: any,
    settings?: any,
    featured_id?: number,
}

export interface defaultSingleMinProps {
    ID: number,
    title?: string,
    slug?: string,
}

export type defaultArrayMinProps = null | Array<defaultSingleMinProps>;

/*-----------------------------------------------------------------------------
Complex JSON
-----------------------------------------------------------------------------*/
export interface ComplexData extends defaultSingleProps {
    cinema_id: number,
    slide_id: number,
    template_id: number,
    popup_id: number,
    menus: boolean | Array<number>
}
export interface singleComplex {
    data: ComplexData,
    lists: {
        menus: defaultArrayMinProps,
        categories: defaultArrayMinProps,
        slides: defaultArrayMinProps,
        templates: defaultArrayMinProps,
        featured_link: null | string
    }
}
/*-----------------------------------------------------------------------------
Menus JSON
-----------------------------------------------------------------------------*/
export interface MenuData extends defaultSingleProps {
    menus: boolean | Array<number>,
    sections: boolean | Array<number>,
    slide_id: number,
    popup_id: number,
    categories: boolean | Array<number>
}
export interface singleMenu {
    data: MenuData,
    lists: {
        complex: defaultArrayMinProps,
        categories: defaultArrayMinProps,
        sections: defaultArrayMinProps,
        slides: defaultArrayMinProps,
        templates: defaultArrayMinProps,
        featured_link: null | string,
        titleImage: null | string,
    }
}

/*-----------------------------------------------------------------------------
Sections JSON
-----------------------------------------------------------------------------*/
export interface SectionData extends defaultSingleProps {
    menus: boolean | Array<number>,
    products: boolean | Array<number>,
    categories: boolean | Array<number>,
    template_id: number,
}
export interface singleSection {
    data: SectionData,
    lists: {
        [key in "complex"|"menus"|"products"|"templates"]:defaultArrayMinProps
    }
}

/*-----------------------------------------------------------------------------
product JSON
-----------------------------------------------------------------------------*/
export interface ProductContent{
    name:string,
    description: string,
    price:number
}
export interface ProductCustomField{
    name:string,
    value:string,
}
export interface ProductSettingsProps{
    custom_field?:ProductCustomField
}
export interface ProductData extends defaultSingleProps {
    sections: boolean | Array<number>,
    products: boolean | Array<number>,
    categories?: boolean | Array<number>,
    template_id?: number,
    promotion_price?:any,
    content?:boolean|Array<ProductContent>,
    settings?:boolean|ProductSettingsProps,
}
export interface singleProduct {
    data: ProductData,
    lists: {
        sections: defaultArrayMinProps,
        templates: defaultArrayMinProps,
    }
}




export type defaultTableListProps = Array<
    ComplexData |
    MenuData |
    SectionData |
    ProductData
>;