import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import "assets/css/App-new.css";
import "assets/css/responsive.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { AuthProvider } from "./auth-context/auth.context";
import { ProtectedRoute } from "./layouts/protected.route.js";
import { Slide, ToastContainer } from "react-toastify";
import Data from "views/admin/ContextFolder/Data";
import { requestForToken } from "components/NotificationToken";
import { PendingMsgProvider } from "contexts/PendindMsgContext";


let user = localStorage.getItem("user");
user = JSON.parse(user);
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Data>
      <AuthProvider userData={user}>
        <PendingMsgProvider>
        <React.StrictMode>
          <HashRouter>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={true}
              closeOnClick={true}
              pauseOnHover={true}
              draggable={true}
              progress={undefined}
              theme="colored"
              transition={Slide}
            />
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <ProtectedRoute path={`/admin`} component={AdminLayout} />
              <ProtectedRoute path={`/rtl`} component={RTLLayout} />
              <Redirect from="/" to="/admin/dashboards" />
            </Switch>
          </HashRouter>
        </React.StrictMode>
        </PendingMsgProvider>
      </AuthProvider>
    </Data>
  </ChakraProvider>,
  document.getElementById("root")
);
requestForToken()