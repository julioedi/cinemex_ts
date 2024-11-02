import { Component, ComponentClass, ComponentProps, FunctionComponent, PropsWithChildren } from "react";
import Logo from "./Logo";
import withRouter from "../../utilities/withRouter";
import { CoreComponentRouterProps } from "../../constants/types";
import { AsideRoutesList, AsideRouteProps } from "../../constants/Routes";
import { GlobalsList } from "../../constants/GlobalsList";
import MenuListItem from "./MenuListItem";

interface CoreAsideState {
    active?: boolean,
}
interface coreAsideProps extends CoreComponentRouterProps {
    active: boolean,
}

interface AsideSettingsProps extends FunctionComponent {
    active: boolean,
}


class CoreAside extends Component<coreAsideProps> {
    state: CoreAsideState = {
        active: this.props.active ?? true,
    }
    getActivecode(): string {
        const loc = this.props.location.pathname.match(/^\/(.*?)(\/|$)/i);
        const code = loc ? loc[1].toLocaleLowerCase() : "";
        return code;
    }
    getLocation(code: string): number {
        let ret = -1;
        for (let i = 0; i < AsideRoutesList.length; i++) {
            const item = AsideRoutesList[i];
            if (code === item?.route) {
                return i;
            }

        }
        return ret;
    }
    // componentDidMount(): void {
    //     if (this.props.location.pathname == "/") {
    //         this.props.navigate("complex");
    //     }
    // }
    render() {
        const activeCode = this.getActivecode();
        const loc = this.getLocation(activeCode);
        const activeStyles = activeCode === "settings" ? { top: "calc(100% - 56px)" } : { top: loc * 52 + 36};
        return (
            <div
                id="aside"
                className={this.state.active ? "active" : ""}
                ref={ref => {
                    GlobalsList["aside"] = ref;
                }}
            >
                <div
                    className="active_element"
                    style={activeStyles}
                />
                <nav>
                    {
                        AsideRoutesList.map((item, index) => (
                            item ? <MenuListItem data={item} key={index} active={loc === index} />
                                : <div key={index} className="divisor" />
                        ))
                    }
                </nav>
                <div className="settings">

                    <MenuListItem
                        data={{
                            route: "settings",
                            icon: "settings",
                            name: "Configuración"
                        }}
                        active={activeCode === "settings"} />
                </div>
            </div>
        )
    }
}

export default withRouter(CoreAside)
