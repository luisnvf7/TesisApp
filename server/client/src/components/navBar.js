/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

/* React boostrap */
import { Navbar, Nav, Button } from "react-bootstrap";

/* Router */
import { Link } from "react-router-dom";

const Navigation = () => {

  return (
    <div>
      <Navbar className = "bg-success">
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item style={{ marginRight: "50px" }}>
              <Button variant="success">
                {" "}
                <Link to="/login" style={{ color: "white" }}>
                  Iniciar Sesion
                </Link>
              </Button>
            </Nav.Item>
            <Nav.Item>
              <Button style = {{ borderColor : 'black', borderWidth: '2px' }} variant="success">
                {" "}
                <Link to="/registro" style={{ color: "white" }}>
                  Registrarse
                </Link>
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
