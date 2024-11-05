
/**
 * 
 * @param data datetime of Date
 * @param lang language to show
 * @returns string empy or formated 
 */
export default function (data:string = "",lang:string = "es-ES"){
    if (data === "") {
        return "";
    }
    const date = new Date(data);
    const output = date.toLocaleString(
        lang,
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: '2-digit', minute:'2-digit', hour12: true  }
    )
    .replace(/\u00a0/g, "")
    .split(" ")
    .map( (item,i) =>{
        if (![0,3].includes(i)) {
            return item;
        }
        return item.charAt(0).toUpperCase() + item.slice(1);
    } )
    .join(" ");
    return output;
}