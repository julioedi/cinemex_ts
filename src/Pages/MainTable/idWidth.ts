export default function(ID:number|string){
    const width = `${ID}`.length;
    return 16 + (width * 8) + 16;
}