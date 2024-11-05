import { GlobalsList } from "../constants/GlobalsList";
export default function(margin:number = 0){
    let size = 0;
    let winSize = window.innerWidth > 800 ? 32 : 46;
    if (margin > 0) {
        size = margin + winSize;
    }
    GlobalsList.Dom.style.marginTop = `${size}px`;
}