/* React importaciones */
import React, { useEffect, useState } from "react";

/* React Boostrap */
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
  Alert,
} from "react-bootstrap";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressBook,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import "../styles/PageStyles/registerProfesional.css";

import { Spring, Transition } from "react-spring/renderprops";

const RegisterProfesional = (props) => {
  const [isShowPass1, setIsShowPass1] = useState(true);
  const [isShowPass2, setIsShowPass2] = useState(true);

  const [states, setStates] = useState([
    "Zulia",
    "Maracay",
    "Caracas",
    "Barquisimeto",
  ]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    password: "",
    state: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [disableButton, setDisableButto] = useState(true);

  const [selectedState, setSelectedState] = useState("Selecciona tu estado");

  const [nameError, setNameError] = useState(null);

  const [usernameError, setUsernameError] = useState(null);

  const [passwordError, setPasswordError] = useState(null);

  const [stateError, setStateError] = useState(null);

  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const stateChange = (v) => {
    setSelectedState(v);
    setUserInfo({ ...userInfo, state: v });
  };

  const checkForm = () => {
    if (userInfo.name === "") {
      errorHandler(setNameError, "Por favor, ingrese un nombre");
      console.log("User vacio");
    }
    if (userInfo.username === "") {
      errorHandler(setUsernameError, "Por favor, ingrese un nombre de usuario");
      console.log("Username vacio");
    }
    if (userInfo.password === "") {
      errorHandler(setPasswordError, "Por favor, ingrese una contraseña");
      console.log("Password vacio");
    }
    if (userInfo.state === "") {
      errorHandler(setStateError, "Por favor, ingrese una fecha");
    }
    if (userInfo.password !== confirmPassword && userInfo.password.length > 0) {
      errorHandler(setConfirmPasswordError, "Contraseñas no coinciden");
    }
  };

  const errorHandler = (setState, param) => {
    setState(param);
    setTimeout(() => {
      setState(null);
    }, 3000);
  };

  const registrarse = () => {
    checkForm();

    console.log("REGISTRO", userInfo);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="card-continer-profesional">
        <Card className="card-profesional">
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              Crear cuenta
            </Card.Title>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faAddressBook} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                placeholder="Nombre Completo"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Transition
              items={nameError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{nameError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                placeholder="Usuario"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Transition
              items={usernameError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{usernameError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <InputGroup className="mb-3">
              <InputGroup.Prepend onClick={() => setIsShowPass1(!isShowPass1)}>
                <InputGroup.Text id="basic-addon1">
                  {" "}
                  {isShowPass1 ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}{" "}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                  setConfirmPassword(e.target.value == "" ? "" : null);
                }}
                placeholder="Contraseña"
                type={isShowPass1 ? "password" : null}
              />
            </InputGroup>

            <Transition
              items={passwordError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{passwordError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <InputGroup className="mb-3">
              <InputGroup.Prepend onClick={() => setIsShowPass2(!isShowPass2)}>
                <InputGroup.Text id="basic-addon1">
                  {" "}
                  {isShowPass2 ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}{" "}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                disabled={userInfo.password.length == 0}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
                type={isShowPass2 ? "password" : null}
                value={confirmPassword}
              />
            </InputGroup>

            <Transition
              items={confirmPasswordError !== null}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(show) =>
                show &&
                ((props) => (
                  <div style={props}>
                    <Alert variant="danger">{confirmPasswordError}</Alert>
                  </div>
                ))
              }
            </Transition>

            <Dropdown drop="up" style={{ marginBottom: "10px", width: "100%" }}>
              <Dropdown.Toggle
                style={{ width: "100%" }}
                variant="success"
                id="dropdown-basic"
              >
                {selectedState}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                {states.map((value) => (
                  <Dropdown.Item onClick={() => stateChange(value)}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <label style={{ fontSize: "14px" }}>
              <input
                type="checkbox"
                onChange={() => setDisableButto(!disableButton)}
              />{" "}
              Al crear tu cuenta aceptas los terminos de servicio y politica de
              seguridad
            </label>

            <Button
              disabled={disableButton}
              style={{ width: "100%" }}
              variant="success"
              onClick={() => registrarse()}
            >
              Registrarse
            </Button>

            <hr />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <label style={{ whiteSpace: "nowrap" }}>
                Ya estas registrado?{" "}
              </label>{" "}
              <Link to="/login" style={{ marginLeft: "3px" }}>
                Ingresa
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RegisterProfesional;
