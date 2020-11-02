import React, { useState, useLayoutEffect  } from "react";
// import "../styles/PageStyles/login.css";
import { Row, Col } from "react-bootstrap";


/* Components */
import LeftSide from "../components/leftSide";
import RightSide from "../components/rightSide";

const Login = (props) => {

  return (
    <div>
      <Row>
        <Col>
          <LeftSide history = { props.history } />
        </Col>
        <Col>
          <RightSide />
        </Col>
      </Row>
    </div>
  );
};

export default Login
