import React, { useState, useEffect, useLayoutEffect } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { connect } from "react-redux";
import { login } from "../actions/authAction";
import { Form, Button, Spinner } from "react-bootstrap";
import { loadProgressBar } from "axios-progress-bar";
import { ToastContainer, toast } from "react-toastify";

import { NOT_USER } from "../actions/types";

import "axios-progress-bar/dist/nprogress.css";
import "../styles/PageStyles/login.css";
import "react-toastify/dist/ReactToastify.css";

const LeftSide = ({ onLogin, history, auth, error }) => {
  useEffect(() => {
    if (error.id != null) {
      if (error.id == NOT_USER) {
        toast.warn(error.msg.message);
      } else {
        toast.error(error.msg.message);
      }
    }
  }, [error]);

  /* Antes de que renderice en el dom */
  useLayoutEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/home");
    }
  }, []);

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  const [userError, setUserError] = useState(null);

  const [passwordError, setPasswordError] = useState(null);

  const checkForm = () => {
    if (usuario == "") {
      errorHandler(setUserError, "Por favor, ingrese valores en el input");
    } else if (usuario.length < 4) {
      errorHandler(setUserError, "Usuario muy corto");
    }
    if (password == "") {
      errorHandler(setPasswordError, "Por favor ingrese valores en el input");
    } else if (password.length < 4) {
      errorHandler(setPasswordError, "Contraseña muy corta");
    } else {
      onLogin(usuario, password, history);
    }
  };

  const errorHandler = (setState, param) => {
    setState(param);
    setTimeout(() => {
      setState(null);
    }, 3000);
  };

  return (
    <div>
      {loadProgressBar()}
      <KeyboardEventHandler
        handleKeys={["enter"]}
        onKeyEvent={(key, e) => onLogin(usuario, password, history)}
      />

      <Form>
        <Form.Group>
          <Form.Label>Ingresa nombre de usuario</Form.Label>
          <Form.Control
            placeholder="usuario"
            onChange={(e) => setUsuario(e.target.value)}
          />
          {userError !== null ? (
            <label style={{ color: "red" }}>{userError}</label>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingresa contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError !== null ? (
            <label style={{ color: "red" }}>{passwordError}</label>
          ) : null}
        </Form.Group>

        <Button onClick={() => checkForm()}>Ingresar</Button>
        <ToastContainer />
      </Form>

      <Button onClick={() => history.push("/registro")} variant="success">
        Crear Cuenta nueva
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth, error } = state;

  return {
    auth,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (usuario, password, history) => {
      dispatch(login(usuario, password, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide);
