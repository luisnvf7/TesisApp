/* React importaciones */
import React, { useEffect, useState } from "react";

/* CSS */
import "../styles/PageStyles/rubro.css";

/* React Boostrap */
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Image,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

const Rubro = (props) => {
  const [rubros, setRubros] = useState([
    "Programacion y tecnologia",
    "Diseño y multimedia",
    "Redaccion y traduccion",
    "Marketing digital y ventas",
    "Soporte administrativo",
    "Legal",
    "Finanzas y Negocios",
    "Ingenieria y Arquitectura",
  ]);

  const [rubroIndex, setRubroIndex] = useState(null);

  const [experiencia, setExperiencia] = useState([
    "menos de 1 año",
    "entre 1 y 3 años",
    "4 a 6 años",
    "mas de 7 años",
  ]);

  const rubroSelected = (rubro, index) => {
    console.log("RUBRO", rubro);

    console.log("INDEX", index);

    setRubroIndex(index);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="rubro-page-style">
        <Card className="card-rubro">
          <Card.Body>
            <h1>(Nombre), listo para trabajar?</h1>
            <label>Indicanos cuales son tus habilidades.</label>
            <br />
            <label>
              Recuerda! Mientras mas informacion proporciones, mas facil te
              encontraran
            </label>
            <label style={{ display: "block" }}>
              En que rubro te especializas?
            </label>
            <Container>
              <Row>
                {/* Aqui iria un mapeo de forma dinamica, traido desde el back */}

                {rubros.map((v, i) => {
                  return (
                    <Col style={{ marginTop: "20px" }} lg={3}>
                      <Card
                        style={{ padding: "10px" }}
                        className={i === rubroIndex ? "selected" : null}
                        onClick={() => rubroSelected(v, i)}
                      >
                        <div className="rubro-container">
                          <label className="label-rubro">{v}</label>

                          {i === rubroIndex ? (
                            <div className="style-icon-rubro">
                              <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                          ) : null}
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              {rubroIndex !== null ? (
                <div>
                  <h3 style={{ marginTop: "30px" }}>
                    Cuales son las areas en las que te especializas
                  </h3>

                  <Row>
                    <Col lg={7}>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Buscar Area"
                          className="input-rubro"
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">
                            <FontAwesomeIcon icon={faSearch} />
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>

                    <Col lg={5}>
                      <div className="right-rubro">
                        <Dropdown style={{ width: "60%" }}>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            style={{ width: "100%" }}
                          >
                            Experiencia
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {experiencia.map((v) => {
                              return <Dropdown.Item>{v}</Dropdown.Item>;
                            })}
                          </Dropdown.Menu>
                        </Dropdown>

                        <Button className="button-rubro">Agregar</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : null}
            
            <div className = "buttons-rubro">
               <Button className="button-rubro">Anterior</Button>
               <Button className="button-rubro">Siguiente</Button>
            </div>

            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Rubro;
