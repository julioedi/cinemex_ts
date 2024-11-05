import { Component } from "react";
import { CoreComponentRouterProps } from "../../constants/types";
import { defaultTableListProps } from "../../constants/types";
import Pagination from "./Pagination";
import { withRouter, setDomMargin,SetPageTitle } from "../../utilities";
import API from "../../API";
import { Loading } from "../../Components/frame";
import List from "./List";
import TableTopBar from "./TableTopBar";
import "../../styles/forms.scss";

import { ProductContent } from "../../constants/types";
interface TableProps extends CoreComponentRouterProps {
    name: string,
    route: string
}

interface TableStateProps {
    loaded: boolean | number,
    data: defaultTableListProps,
    page: defaultTableListProps,
    currentPage: number,
    search:string,
}

class CoreMainTable extends Component<TableProps> {
    state: TableStateProps = {
        loaded: false,
        data: [],
        page: [],
        currentPage: 0,
        search:""
    }
    maxNumber:number = 1;
    perPage: number = 12;
    componentDidMount(): void {
        SetPageTitle(`Lista de ${this.props.name}`);
        setDomMargin(96);
        API.getTableData(this.props.route)
            .then(data => {
                const newData = this.getFormated(data, 0);
                this.setState(newData)
            })

    }
    componentWillUnmount(): void {
        SetPageTitle();
        setDomMargin(0);
    }

    getLastID = (data:defaultTableListProps) =>{
        let ID = 1;
        data.forEach(i =>{
            if (i.ID > ID) {
                ID = i.ID;
            }
        });
        return ID;
    }

    getFormated = (data: defaultTableListProps, page: number = 0) => {
        const start = this.perPage * page;
        const pageArray = data.slice(start, start + this.perPage)
        const newData: TableStateProps = {
            loaded: true,
            data: [...data],
            page: pageArray,
            currentPage: page,
            search: ""
        };
        return newData;
    }
    changePage = (index: number) => {
        const newData = this.getFormated(this.state.data, index);
        this.setState(newData)
    }
    
    filterData = () =>{
        const {search} = this.state;
        const reg = new RegExp(search,"i");
        const compare = (name:string) =>{
            return name.match(reg);
        }
        return this.state.data.filter(item =>{
            const {title,content} = item;
            if (compare(title ?? "")) {
                return true;
            }
            if(this.props.route === "products" && Array.isArray(content)){
                for (let i = 0; i < content.length; i++) {
                    const product:ProductContent = content[i];
                    if (compare(product.name) || compare(product.description)) {
                        return true;
                    }
                }
            }

            return false;
        })
    } 


    render() {
        const isSearch = this.state.search !== ""
        const elData = !isSearch ? this.state.page : this.filterData();
        const preTotal = !isSearch ? this.state.data : this.filterData();
        const total: number = Math.ceil(preTotal.length / this.perPage);
        const isMargin = total > 1 ? " mb-64" : "";
        if (!this.state.loaded) {
            return (
                <div id="table_content">
                    <Loading />
                </div>
            )
        }
        return (
            <>
                <TableTopBar total={this.state.data.length} title={this.props.name} onSearch={(value) =>{
                    this.setState({
                        search: value.trim()
                    })
                }}/>

                <div id="table_content">
                    <div className="table_wrap">
                        <div className={`table_holder${isMargin}`}>
                            <List pages={total} data={elData} name={this.props.route} />
                        </div>
                        <Pagination total={total} onChange={this.changePage} active={this.state.currentPage} />
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(CoreMainTable)