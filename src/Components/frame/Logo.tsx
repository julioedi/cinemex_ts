import { Component, ComponentClass } from "react";
import { onClick } from "../../constants/types";
interface LogoProps extends ComponentClass {
    active?: boolean | undefined | null,
    onClick?:onClick
}
export default class Logo extends Component<LogoProps> {
    render() {
        const active = this.props.active ?? true;
        return (
            <div className="logo">
                <span className={`logo_cinemex${active ? " active" : ""}`} onClick={this.props?.onClick} />
            </div>
        )
    }
}
