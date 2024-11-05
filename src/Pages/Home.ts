import { useNavigate } from "react-router-dom";

export default function(){
    const nav = useNavigate();
    nav("/complex");
    return null;
}