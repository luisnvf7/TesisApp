/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

/* React boostrap */
import { Navbar, Nav, Button, Overlay, OverlayTrigger, Popover, Container, Col, Row } from "react-bootstrap";

/* Router */
import { Link } from "react-router-dom";

import { connect } from "react-redux";


const Navigation = ( { type, auth } ) => {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title style = {{ textAlign: 'center' }} as="h3">{ auth.user.username_freelancer }</Popover.Title>
      <Popover.Content>
        <Container>
          <Row>
            <Col> <Link to = "/micuenta"> Mi cuenta</Link></Col>
            {/* <Col> <Link to = "/miperfil">Mi perfil</Link></Col> */}
          </Row>
          <hr />
          <Row>
             <label style = {{  width: '100%', textAlign: 'center'}}>Cerrar Sesion</label>
          </Row>
        </Container>
        {/* And here's some <strong>amazing</strong> content. It's very engaging.
        right? */}
      </Popover.Content>
    </Popover>
  );
  

  const render = () => {

    if ( type === "home") {
      return (
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
      )
    } else {
        return (
          <Navbar className = "bg-success">
          <Navbar.Collapse className="justify-content-end">
            <Nav style = {{ marginRight: '100px' }}>
              <Nav.Item style={{ marginRight: "50px" }}>
                <Button variant="success">
                  {" "}
                  <Link to="/login" style={{ color: "white" }}>
                    ??
                  </Link>
                </Button>
              </Nav.Item>
              <Nav.Item>

              <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>

                <Button variant="success">
                  {" "}
                  {/* <Link to="/registro" style={{ color: "white" }}> */}
                    Cuenta
                  {/* </Link> */}
                </Button>

              </OverlayTrigger>


              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        )
    }

  }

  return (
    <div>
      {  
        render()
      }
    </div>
  );
};

const mapStateToProps = (state) => {
    
    const { auth } = state
    

    return {
      auth
    }
   
}

const mapDispatchToProps = () => {


}



export default connect(mapStateToProps, mapDispatchToProps) ( Navigation );
