import { Component, ComponentClass } from "react";
import { ReactInstance } from "react";
import { fullDate } from "../../utilities";
import { GlobalsList } from "../../constants/GlobalsList";

interface editHeaderProps extends ComponentClass {
    updated: string,
    settings: boolean,
    code: string,
    ID: number,
}

export default class extends Component<editHeaderProps> {

    state = {
        canSave: false,
    }
    static defaultProps = {
        updated: "",
        settings: false,
        code: "",
        ID: "",
    }
    componentDidMount(): void {
        window.addEventListener("vo_isActive",this.isActive);
    }
    componentWillUnmount(): void {
        window.removeEventListener("vo_isActive",this.isActive);
    }

    isActive = (data:any) =>{
        if (data.detail != this.state.canSave) {
            this.setState({
                canSave: data.detail,
            })
        }
    }

    getFormatedDate = () => {
        const { updated } = this.props;
        if (updated == "") return "";
    }
    render() {
        const date = fullDate(this.props.updated);
        const {canSave} = this.state; 
        const saveStyle = canSave ? "btn" : "btn disabled";
        return (
            <div id="mainHead">
                <div className="title">
                    <span className="mso clean action">arrow_back</span>
                    <div className="table_title_totals">Última actualizacion: {date}</div>
                </div>
                <div className="actions_list">
                    <div className="btn  outlined">
                        <span>Configuración</span>
                        <span className="icon mso">settings</span>
                    </div>
                    <div className={saveStyle}>
                        <span>Guardar</span>
                        <span className="icon mso">cloud_upload</span>
                    </div>
                </div>
            </div>
        );
    }
}