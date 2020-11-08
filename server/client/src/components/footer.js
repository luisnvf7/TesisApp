/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { Row, Col, Container } from "react-bootstrap";


const Footer = () => {

    return (
        <footer className = "footer">

        <Container>
            <Row>
                <Col><div>Hola</div></Col>
                <Col><div>Hola</div></Col>
                <Col><div>Hola</div></Col>
            </Row>
        </Container>

        <div className = "bg-success" >
          <label style = {{ display: 'block', textAlign : 'center' }}>Copyright &copy; 2021. Todos lo derechos reservados</label>
        </div>
      </footer>
    )

}

export default Footer