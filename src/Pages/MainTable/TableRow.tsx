import { Component, ComponentClass, MouseEvent } from "react";
import { defaultSingleProps } from "../../constants/types";
import { Navigate, NavigateFunction } from "react-router-dom";
import idWidth from "./idWidth";
interface TableRowProps extends ComponentClass {
    data: defaultSingleProps,
    navigate: NavigateFunction,
    name: string,
}

interface statusOptions {

}
export default class extends Component<TableRowProps> {

    stateOptions: string[][] = [
        ["draft", "Borrador"],
        ["published", "Publicado"],
        ["off", "Despidete"]
    ]

    getStatus = (status: number): Array<string> | null => {
        return this.stateOptions[status] ?? this.stateOptions[0];
    }

    /**
     * Go to edit page
     */
    Edit = () => {
        const { title } = this.props.data;
        return (
            <div className="icon_btn mso clean" aria-label={title} onClick={this.goToEdit}>
                <span>edit</span>
            </div>
        )
    }

    goToEdit = () => {
        const { ID } = this.props.data;
        const uri = `/${this.props.name}/edit/${ID}`;
        this.props.navigate(uri)
    }

    /**
     * clone all parameters of current element, and create a new one
     */

    Duplicate = () => {
        const { name, data } = this.props;
        const { ID, title } = data;
        return (
            <div className="icon_btn mso clean" aria-label={title}>
                <span>file_copy</span>
            </div>
        )
    }

    /**
     * Perform delete element from table
     */
    Delete = () => {
        const { name, data } = this.props;
        const { ID, title } = data;
        return (
            <div className="icon_btn mso clean" aria-label={title}>
                <span>delete</span>
            </div>
        )
    }
    /**
     * Current row element status draf|publish|off
     */
    CellStatus = () => {
        const { status, ID } = this.props.data;
        const state = this.getStatus(status ?? 0);
        if (!state) {
            return <td className="status_wrap"></td>
        }
        return (
            <td className="status_wrap" onClick={this.stop}>
                <div className={`status ${state[0]}`}>
                    {state[1]}
                </div>
            </td>
        );
    }
    /**
     * Prevents when click in row move direct to element to edit
     */
    stop = (e: MouseEvent) => {
        e.stopPropagation();
        return e
    }
    render() {
        const { CellStatus, Edit, Duplicate, Delete } = this;
        const { ID, title, slug } = this.props.data;
        const width = idWidth(ID);
        return (
            <tr data-rowid={ID} onClick={this.goToEdit}>
                <td
                    className="ID"
                    style={{
                        width: width
                    }}
                >
                    {ID}
                </td>
                <td className="title">{title}</td>
                <td className="slug">/{slug}</td>
                <CellStatus />
                <td className="table_row_actions" onClick={this.stop}>
                    <Edit />
                    <Duplicate />
                    <Delete />
                </td>
            </tr>
        )
    }
}