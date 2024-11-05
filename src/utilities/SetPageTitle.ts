import { GlobalsList } from "../constants/GlobalsList";
const defaultPageTitle = `${ GlobalsList.PageTitle.innerHTML}`;
export default function(title:string = ""){
    const pagTitle = title == "" ? defaultPageTitle : title;
    GlobalsList.PageTitle.innerHTML = pagTitle;
}