import { FunctionComponent } from "react";
export interface AsideRouteProps{
    /**
    * Material design icon to show
    */
    icon:string,
    /**
    * Display name 
    */
    name:string,
    /**
    *Relative route path
    */
    singular?:string,
    /**
    *Relative route path
    */
    route:string,
}

export type AsideRoutesListProps = Array<AsideRouteProps|null>

export interface AsideMenuItemProps extends FunctionComponent {
  active?: boolean|null,
  data: AsideRouteProps ,
}

export const AsideRoutesList:AsideRoutesListProps = [
    {
      icon: "pin_drop",
      name: "Complejos",
      singular: "complejo",
      route: "complex",
    },
    {
      icon: "menu_book",
      name: "Menus",
      singular: "menu",
      route: "menus",
    },
    {
      icon: "variable_add",
      name: "Secciones",
      singular: "sección",
      route: "sections",
    },
    {
      icon: "fastfood",
      name: "Productos",
      singular: "producto",
      route: "products",
    },
    {
      icon: "code_blocks",
      name: "Plantillas",
      singular: "plantilla",
      route: "templates",
    },
    null,
    {
      icon: "window",
      name: "Pop Ups",
      singular: "pop-up",
      route: "popups",
    },
    {
      icon: "gallery_thumbnail",
      name: "Slides",
      singular: "slide",
      route: "slides",
    },
    {
      icon: "media_link",
      name: "Módulos Slide",
      singular: "módulo",
      route: "slices",
    },
    {
      icon: "document_scanner",
      name: "Legales",
      singular: "legal",
      route: "legals",
    },
  ];