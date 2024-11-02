import React, { Component, ComponentClass } from "react";
import "./styles/generals.scss";
import { AsideRoutesList } from "./constants/Routes";
import Logo from "./Components/frame/Logo";
import Aside from "./Components/frame/Aside";
import { basePath } from "./constants";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { GlobalsList } from "./constants/GlobalsList";
import { mainPages, editPages } from "./Pages";
import { AsideRouteProps } from "./constants/Routes";

const None = () => null;

export default class extends Component<ComponentClass> {
  routesList = AsideRoutesList;

  Layout = () => {
    return (
      <>
        <div id="header">
          <Logo />
          <div className="pageTitle" ref={(ref) => {
            GlobalsList["mobileTitle"] = ref;
          }}>
          </div>
        </div>
        <Aside />
        <div id="body_content">
          <Outlet />
        </div>
      </>
    )
  }
  getRoutes(): Array<AsideRouteProps> {
    const filterRoutes = [];
    for (let i = 0; i < AsideRoutesList.length; i++) {
      const element = AsideRoutesList[i];
      if (element) {
        filterRoutes.push(element)
      }
    }
    return filterRoutes;
  }

  render() {
    const { Layout } = this;
    const filterRoutes = this.getRoutes();
    return (
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {
              filterRoutes.map((item, index) => {
                const basePath = "/" + item.route;
                const Main = mainPages[item.route] ?? None;
                const Edit = editPages[item.route] ?? None;
                return (
                  <Route key={index}>
                    <Route
                      key={`table_${index}`}
                      path={basePath}
                      element={<Main key={item.route} head={item.name} title={`Listado de ${item.name} - Platino`} code={item.route} />}
                    />
                    <Route
                      path={`${basePath}/edit/:id`}
                      element={<Edit />}
                    />
                  </Route>
                )
              })
            }
            <Route
              path="/settings"
              element={<None/>}
            />
            <Route
              path="*"
              element={<Navigate to="/complex" />}
            />
          </Route>

        </Routes>
      </BrowserRouter>
    )
  }
}
