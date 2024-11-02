import { Link } from "react-router-dom";
export default function(props: any) {
    const {data,active} = props;
    return (
        <Link to={data?.route} className={active ? "nav_item active" : "nav_item"}>
            <div className={`icon mso${active ? ' filled' : ''}`}>
                {data.icon}
            </div>
            <div className="name">
                {data.name}
            </div>
        </Link>
    )
}