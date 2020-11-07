/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* Actions */
import { login } from "../actions/authAction";
import { NOT_USER } from "../actions/types";

/* React Boostrap */
import {
  Form,
  Button,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";

/* Otros */
import { loadProgressBar } from "axios-progress-bar";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import KeyboardEventHandler from "react-keyboard-event-handler";

/* CSS */
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

  const [isShow, setIsShow] = useState(false);

  const checkForm = () => {
  
    if (usuario == "") {
      errorHandler(setUserError, "Por favor, ingrese valores en el input");
    } else if (usuario.length < 4) {
      errorHandler(setUserError, "Usuario muy corto");
    }
    else if (password == "") {
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
          <div className="input-wrapper">
            <Form.Control
              placeholder="usuario"
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          {userError !== null ? (
            <label style={{ color: "red" }}>{userError}</label>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingresa contraseña</Form.Label>

          <InputGroup className="mb-3">
            <Form.Control
              type = { isShow ? null : 'password' }
              placeholder="contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputGroup.Append onClick = {() => setIsShow(!isShow)} >
              <InputGroup.Text id="basic-addon2">
                <FontAwesomeIcon className="icon" icon={ isShow ? faEyeSlash : faEye } />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>

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
