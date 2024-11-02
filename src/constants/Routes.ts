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
      route: "complex",
    },
    {
      icon: "menu_book",
      name: "Menus",
      route: "menus",
    },
    {
      icon: "variable_add",
      name: "Secciones",
      route: "sections",
    },
    {
      icon: "fastfood",
      name: "Productos",
      route: "products",
    },
    {
      icon: "code_blocks",
      name: "Plantillas",
      route: "templates",
    },
    null,
    {
      icon: "window",
      name: "Pop Ups",
      route: "popups",
    },
    {
      icon: "gallery_thumbnail",
      name: "Slides",
      route: "slides",
    },
    {
      icon: "media_link",
      name: "Modulos Slide",
      route: "slices",
    },
    {
      icon: "document_scanner",
      name: "Legales",
      route: "legals",
    },
  ];