import React, { useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";

import "./../../../../assets/scss/style.scss";
import Aux from "../../../../hoc/_Aux";
import Breadcrumb from "../../../layout/AdminLayout/Breadcrumb";
import { Button, Alert } from "react-bootstrap";

import { useAuth } from "../../../contexts/AuthContext";

const SignIn = (props) => {
  const { loginWithGoogle, currentUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLoginWithGoogle(e) {
    e.preventDefault();

    try {
      setError("");
      const status = await loginWithGoogle();
      if (status.user && status.user !== null) {
        history.push("/");
        return;
      }
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  const alert = error ? (
    <Alert onClose={() => setError("")} dismissible variant={"danger"}>
      {error}\
    </Alert>
  ) : null;

  if (currentUser) {
    return <Redirect to={"/"} />;
  }

  return (
    <Aux>
      <Breadcrumb />
      {alert}
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="d-grid">
                <Button
                  variant="outline-primary"
                  onClick={handleLoginWithGoogle}
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading…" : "Sign in with Google"}
                </Button>
              </div>
              <hr />
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                />
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-1"
                    id="checkbox-fill-a1"
                  />
                  <label htmlFor="checkbox-fill-a1" className="cr">
                    {" "}
                    Save credentials
                  </label>
                </div>
              </div>
              <button className="btn btn-primary shadow-2 mb-4">Login</button>
              <p className="mb-2 text-muted">
                Forgot password?{" "}
                <NavLink to="/auth/reset-password-1">Reset</NavLink>
              </p>
              {/* <p className="mb-0 text-muted">
                  Don’t have an account?{" "}
                  <NavLink to="/auth/signup">Signup</NavLink>
                </p> */}
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignIn;
