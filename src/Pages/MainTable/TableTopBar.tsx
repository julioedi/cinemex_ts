import { ChangeEvent, Component, ComponentClass } from "react";
import { Navigate } from "react-router-dom";

interface TableTopBarProps extends ComponentClass {
    total: number,
    title: string,
    name?: string,
    onSearch?: (a: string) => void
}

interface TableTopBarStateProps {
    isSearch: boolean
}

export default class extends Component<TableTopBarProps> {
    state: TableTopBarStateProps = {
        isSearch: false,
    }
    getName = () => {
        if (this.props?.name) {
            return this.props.name
        }
        return this.props.title.replace(/^(.*?)s$/i, "$1").toLowerCase();
    }
    /**
     * Display page title
     */
    Title = () => {
        const { title, total } = this.props;
        const name = this.getName();
        const results = total == 0 ? "Sin resultados"
            : total === 1 ? "1 Resultado"
                : `(${total}) resultados encontrados`
        return (
            <div className="title">
                <div className="table_title">{title}</div>
                <div className="table_title_totals">{results}</div>
            </div>
        )
    }

    toggleSearch = () => {
        this.setState({
            isSearch: !this.state.isSearch,
        })
    }
    SearchBtn = () => {
        return (
            <div className="icon_btn mso" onClick={this.toggleSearch}>
                <span>search</span>
            </div>
        )
    }
    AddNew = () => {
        return (
            <div className="btn  default">
                <span className="icon mso">add</span>
                <span>Agregar complejo</span>
            </div>
        )
    }
    onSearch = (val:string = "") =>{
        if (this.props?.onSearch) {
            this.props?.onSearch(val);
        }
    }
    SearchBar = () => {
        if (!this.state.isSearch) {
            return null;
        }
        return (
            <div id="search_header">
                <input placeholder="Buscar.."  onInput={(e:ChangeEvent<HTMLInputElement>) =>{
                    this.onSearch(e.target?.value ?? "");
                }}/>
                <div className="icon_btn mso" onClick={() =>{
                    this.toggleSearch();
                    this.onSearch();
                }}>
                    <span>close</span>
                </div>
            </div>
        )
    }

    Actions = () => {
        const { SearchBtn, AddNew } = this;
        return (
            <div className="actions_list">
                <SearchBtn />
                <AddNew />
            </div>
        );
    }

    render() {
        const { Title, Actions,SearchBar } = this;
        return (
            <div id="mainHead">
                <Title />
                <Actions />
                <SearchBar/>
            </div>
        );
    }
}