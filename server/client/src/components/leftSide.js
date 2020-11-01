import React, { useState, useEffect } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import {connect} from 'react-redux'

import { login } from '../actions/authAction'


import { Form, Button } from "react-bootstrap";

const LeftSide = ({ onLogin, history }) => {

  const [usuario, setUsuario] = useState("");

  const [password, setPassword] = useState("");

  return (
    <div>
      <KeyboardEventHandler
        handleKeys={["enter"]}
        onKeyEvent={(key, e) => onLogin(usuario, password, history)}
      />

      <Form>
        <Form.Group>
          <Form.Label>Ingresa nombre de usuario</Form.Label>
          <Form.Control placeholder="usuario" onChange = { (e) => setUsuario(e.target.value)  } />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingresa contraseña</Form.Label>
          <Form.Control placeholder="contraseña" onChange = { (e) => setPassword(e.target.value) } />
        </Form.Group>
        <Button onClick = {() => onLogin(usuario, password, history)} >Ingresar</Button>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {

    return {
      onLogin : (usuario, password, history) => {
        dispatch(login(usuario, password, history))
      }
    }
}

export default connect(null, mapDispatchToProps)(LeftSide); 
