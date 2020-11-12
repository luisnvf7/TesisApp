/* React importaciones */
import React, { useEffect, useState } from "react";

/* CSS */
import "../styles/PageStyles/postRegister.css";

/* React Boostrap */
import { Card, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";

const PostRegister = (props) => {


    const [isDisable, setIsDisable] = useState(true)


  return (
    <div style={{ height: "100vh" }}>
      <div className="content-container">
        <Card className = "card-style-post">
          <Card.Body>
            <Container>
              <Row>
                <Col lg={8} md = {12} >
                  <h3 style = {{ textAlign: 'center' }}>Hola (nombre) bienvenido a (Nombre pagina)</h3>
                  <label style = {{ marginTop: '10px' }}>
                    Aqui te ayudaremos a crear tu perfil como freelancer para
                    que consigas tu primer proyecto. Sigue estos pasos, y llena
                    toda la informacion posible para que aumenten tus
                    posibilidades de conseguir empleo.
                    <br />
                    <br />
                    Ten en cuenta que un perfil con poca informacion es un
                    perfil sin transparencia, por ende tus posibilidades de
                    conseguir trabajo se veran afectadas de manera directa
                  </label>
                  <br />
                  <br />
                  <label className = "checkbox-container">
                    <input
                      name="isGoing"
                      type="checkbox"
                      style = {{ marginRight: '5px' }}
                      className = "checkbox-style"
                      onChange={ () => setIsDisable(!isDisable)   }
                    />
                    Entendido
                  </label>
                </Col>
                <Col lg={4} md = {12}>
                    <Image className = "img-container-post" src="https://lh3.googleusercontent.com/proxy/Fi_H3_ikergy8cO5kqRFxnaDW0X5-aecRsncuNn6X65WvQQnZ5yCkgIKSly9rwEFT7bXddVy_FpyZZcd_zjE-_KYOlg1W4D9QEXdk3TaVf34T-l2o4UBfSdk2z8HtNKfKlcy843bEq_9V3S9TuY9QsD3z5Emjg" fluid />     
                    <div className = "boton-contenedor">    
                    <Button onClick = { () => props.history.push('/registro/rubro')  } style = {{ marginTop: '10%', borderRadius: '20px' }} variant="success" disabled = {isDisable}>Comenzar</Button>
                    </div>   
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PostRegister;
