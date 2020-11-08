/* React importaciones */
import React, { useState, useLayoutEffect } from "react";

/* React boostrap */
import {
  Col,
  Row,
  InputGroup,
  FormControl,
  Button,
  Spinner,
  Container,
  Image,
} from "react-bootstrap";

/* Components */
import Navbar from "../components/navBar";
import Categories from "../components/categories";
import Footer from "../components/footer";

/* CSS */
import "../styles/PageStyles/principal.css";

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Principal = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState([
    {
      titulo: "Programador",
      src:
        "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2020/02/lenguaje-programacion-1859691.jpg?itok=PSYEVgtj",
    },
    {
      titulo: "Diseño",
      src:
        "https://ideakreativa.net/wp-content/uploads/2020/01/programas-para-dise%C3%B1o-2020-1024x576.jpg",
    },
    {
      titulo: "Esritura",
      src:
        "https://i2.wp.com/www.infotecarios.com/wp-content/uploads/escritura.jpg?fit=770%2C410&ssl=1",
    },
    {
      titulo: "Marketing",
      src:
        "https://www.estrategiaynegocios.net/csp/mediapool/sites/dt.common.streams.StreamServer.cls?STREAMOID=EJiZA3cUe78rpkwgKbdvRc$daE2N3K4ZzOUsqbU5sYt8QgJDrP6_oWgzQvrTXjLC6FB40xiOfUoExWL3M40tfzssyZqpeG_J0TFo7ZhRaDiHC9oxmioMlYVJD0A$3RbIiibgT65kY_CSDiCiUzvHvODrHApbd6ry6YGl5GGOZrs-&CONTENTTYPE=image/jpeg",
    },
    {
      titulo: "Administracion",
      src:
        "https://lh3.googleusercontent.com/proxy/-FWBfipG86LclaRrpCcMjSm6AvRI7oNoAyiMQJwuzyMzVb6ewyqgdlHbkDnwGljYEO1t8kMOAyV22bY4PlbpSj7ysahWj4m-LuwPmpXpoUH3Ay4tOlS98bM96vKm9pSwBA",
    },
  ]);

  const search = () => {
    console.log("Searching....");

    setIsLoading(true);

    //Peticion

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="Main-page">
      <Navbar />
      <div className="bg-success" style={{ paddingBottom: "10%" }}>
        <div>
          <Row>
            <Col>
              <div style={{ textAlign: "center" }}>
                <h1 style={{ color: "white" }}>
                  Encuentra el talento que <br></br> necesitas{" "}
                </h1>
              </div>

              <div className="center-div">
                <InputGroup className="mb-3" style={{ width: "70%" }}>
                  <InputGroup.Text id="basic-addon1">
                    {isLoading ? (
                      <Spinner
                        animation="border"
                        variant="success"
                        style={{ width: "20px", height: "20px" }}
                      >
                        {" "}
                      </Spinner>
                    ) : (
                      <FontAwesomeIcon className="icon" icon={faSearch} />
                    )}
                  </InputGroup.Text>

                  <FormControl
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="¿Que desea buscar?"
                  />
                  <InputGroup.Append style={{ marginLeft: "5px" }}>
                    <Button variant="dark" onClick={() => search()}>
                      Button
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Col>
            <Col>
              <h1>Imagen aqui</h1>
            </Col>
          </Row>
        </div>
      </div>

      <Container>
        <h1 style={{ margin: "20px" }}>Categorias</h1>

        <Row>
          {categories.map((v, i) => {
            return (
              <Col lg={3} sm={6}>
                <Categories content={v} />
              </Col>
            );
          })}
        </Row>
      </Container>

      <div style={{ background: "#F2EEED", paddingBottom: '30px', paddingTop: '30px' }}>
        <h4 style={{ textAlign: "center" }}>Como funciona?</h4>
        <Container style={{ marginTop: "50px" }}>
          <Row>
            <Col sm = {6} lg = {4} >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    style={{ width: "80px", height: "80px"}}
                    src="https://cdn0.iconfinder.com/data/icons/conceptual-communication-filled-outline/64/poster-advertisement-_placard-notice-posting-512.png"
                    roundedCircle
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label>Publica un trabajo</label>
                  <label
                    style={{ overflowWrap: "break-word", display: "inline" }}
                  >
                    asldnasdnasdniasdiasdasidnaindasndnaskdnasklndaklndklnakndkl
                  </label>
                </div>
              </div>
            </Col>
            <Col sm = {6} lg = {4}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    style={{ width: "80px", height: "80px" }}
                    src="https://www.flaticon.com/svg/static/icons/svg/1803/1803330.svg"
                    roundedCircle
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label>Obten ofertas</label>
                  <label
                    style={{ overflowWrap: "break-word", display: "inline" }}
                  >
                    asldnasdnasdniasdiasdasidnaindasndnaskdnasklndaklndklnakndkl
                  </label>
                </div>
              </div>
            </Col>
            <Col sm = {6} lg = {4}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    style={{ width: "80px", height: "80px" }}
                    src="https://www.silverkey.org/wp-content/uploads/2018/07/payment-icon-01.jpg"
                    roundedCircle
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <label>Paga rapido y seguro</label>
                  <label
                    style={{ overflowWrap: "break-word", display: "inline" }}
                  >
                    asldnasdnasdniasdiasdasidnaindasndnaskdnasklndaklndklnakndkl
                  </label>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ marginTop: "30px" }}>
        <Row>
          <Col>
            <h1>Lo que ofrecemos</h1>

            <label>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et at eu,
              accumsan vel egestas nunc. Eget mattis accumsan nullam nulla
              dictumst varius tellus nec ultrices.
            </label>

            <label style={{ display: "block" }}>- Element</label>
            <label style={{ display: "block" }}>- Element</label>
            <label style={{ display: "block" }}>- Element</label>
            <label style={{ display: "block" }}>- Element</label>
          </Col>

          <Col>
            <h1>Imagen</h1>
          </Col>
        </Row>
      </Container>

      <Footer />

      {/* <footer className = "footer">
        <h1>El footer</h1>
        <div className = "bg-success" >
          <label style = {{ display: 'block', textAlign : 'center' }}>Copyright &copy; 2021. Todos lo derechos reservados</label>
        </div>
      </footer> */}
    </div>
  );
};

export default Principal;
