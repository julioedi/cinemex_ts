import { Component, ComponentClass } from "react";
import Form from "../../CustomElements/Form";
import API from "../../API";
import { CoreComponentRouterProps, singleComplex } from "../../constants/types";
import { setDomMargin, SetPageTitle, withRouter } from "../../utilities";
import { Location } from "react-router-dom";
import { Loading } from "../../Components/frame";
import { EditHeader } from "../../Components/edit";

type defaultsList = {
    data: null,
    list: null,
    error?: boolean
} | singleComplex;

interface singleComplexProps extends CoreComponentRouterProps {
    para: Location,
}

class CoreComplexEdit extends Component<CoreComponentRouterProps> {
    state: defaultsList = {
        data: null,
        list: null,
        error: false,
    }
    componentDidMount(): void {
        SetPageTitle("Editar");
        setDomMargin(96);
        const { ID } = this.props.params
        API.getSingle({
            code: "complex",
            id: ID,
        })
            .then(data => {
                if (data.error) {
                    this.setState({
                        error: true,
                    })
                    SetPageTitle("Error al Editar complejo");
                } else {
                    this.setState(data);
                    SetPageTitle(`Editar ${data.data.title}`);
                }
            })
    }
    componentWillUnmount(): void {
        SetPageTitle();
        setDomMargin(0);
    }
    render() {
        if (!this.state.data) {
            return (
                <Loading fullpage />
            )
        }
        return (
            <>
                <EditHeader updated={this.state.data.updated}/>
                <Form className="complex" initialData={{
                    wow: ""
                }}>
                    <input name="wow" placeholder="aqui perro"/>
                </Form>
            </>
        )
    }
}

export default withRouter(CoreComplexEdit)
