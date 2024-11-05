import { Component, ComponentClass } from "react";
import { CoreComponentRouterClass, defaultTableListProps } from "../../constants/types";
import TableRow from "./TableRow";
import { withRouter } from "../../utilities";
import idWidth from "./idWidth";

interface ListTableDataPorps extends CoreComponentRouterClass {
    data: defaultTableListProps,
    pages: number,
    name?: string
}
class List extends Component<ListTableDataPorps> {

    TableHead = () => {
        const width = idWidth("ID");
        return (
            <thead>
                <tr>
                    <td className="ID" style={{width:width}}>ID</td>
                    <td className="title">Título</td>
                    <td className="slug">enlace</td>
                    <td className="status status_wrap">Estado</td>
                    <td>&nbsp;</td>
                </tr>
            </thead>

        );
    }
    render() {
        const { data, name } = this.props;
        const stringName = `${name}`;
        const { TableHead } = this;

        if (data.length === 0) {
            return (
                <div className="table_holder">
                    Sin resultados
                </div>
            )
        }

        return (
            <table cellSpacing="0">
                <TableHead />
                <tbody>
                    {
                        data.map((item, index) => (
                            <TableRow data={item} navigate={this.props.navigate} name={stringName} key={index} />
                        ))
                    }
                </tbody>
            </table>
        );
    }
}


export default withRouter(List)