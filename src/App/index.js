import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";

import { default as AuthProvider } from "./contexts/AuthContext";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

const App = (props) => {
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
    <AuthProvider>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Switch>
            {menu}
            <Route path="/" component={AdminLayout} />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </AuthProvider>
  );
};

export default App;
