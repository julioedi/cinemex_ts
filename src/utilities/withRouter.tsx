import {ComponentClass, FunctionComponent, JSXElementConstructor, ReactNode } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function withRouter(Item:JSXElementConstructor<any>) {
  function ComponentWithRouterProp(props:any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Item
        {...props}
        location={location}
        navigate={navigate}
        params={params}
      />
    );
  }
  return ComponentWithRouterProp;
}