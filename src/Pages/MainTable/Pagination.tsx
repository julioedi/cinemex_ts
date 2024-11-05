import { Component,ComponentClass } from "react";

interface TablePaginationProps extends ComponentClass{
    total:number,
    active:number,
    onChange:(a: number) => any
}


export default class extends Component<TablePaginationProps>{
    constructor(props:TablePaginationProps){
        super(props)
    }
    render(){
        const {active,onChange,total} = this.props;
        const pages = Array.from({ length: total }, (value, index) => index + 1);
        if (total < 2 ) {
            return  null;
        }
        return (
            <div className="table_pagination">
            {
                pages.map( (item,index) => {
                    if (index === active) {
                        return(
                            <div className="item active" key={index}>
                                {item}
                            </div>
                        )
                    }
                    return(
                        <div className="item" key={index} onClick={() =>{
                            onChange(index);
                        }}>
                            {item}
                        </div>
                    )
                })
            }
        </div>
        )
    }
}