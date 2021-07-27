import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import { useAuth } from "../../contexts/AuthContext";
import "./app.scss";

const AdminLayout = (props) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Redirect to="/auth/signin" />;
  }

  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });

  return (
    <Fullscreen enabled={props.isFullScreen}>
      <Aux>
        <Navigation />
        <NavBar />
        <div className="pcoded-main-container">
          <div className="pcoded-wrapper">
            <div className="pcoded-content">
              <div className="pcoded-inner-content">
                <Breadcrumb />
                <div className="main-body">
                  <div className="page-wrapper">
                    <Suspense fallback={<Loader />}>
                      <Switch>
                        {menu}
                        {/* redirect if path not matches the menu */}
                        <Redirect to={props.defaultPath} />
                      </Switch>
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    </Fullscreen>
  );
};

const mapStateToProps = (state) => {
  return {
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    configBlock: state.configBlock,
    layout: state.layout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
