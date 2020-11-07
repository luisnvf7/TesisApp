/* React importaciones */
import React, { useState, useLayoutEffect } from "react";

import { Navbar, Nav, Button } from "react-bootstrap";

import { Link } from "react-router-dom";


const Principal = (props) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item style={{ marginRight: "50px" }}>
              <Button variant="success"> <Link to = "/login" style = {{ color: 'white' }}>Iniciar Sesion</Link></Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="success"> <Link to = "/registro" style = {{ color: 'white' }}>Registrarse</Link></Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        {/* <Nav c activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav> */}
      </Navbar>
    </div>
  );
};

export default Principal;
