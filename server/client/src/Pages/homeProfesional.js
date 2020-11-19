/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* React Boostrap */
import {
  Toast,
  Carousel,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Spinner,
  Button
} from "react-bootstrap";

/* CSS */
import "../styles/PageStyles/home.css";
// import "../styles/PageStyles/homeProfesional.css"

/* Componentes */
import NavBar from "../components/navBar";

/* Acciones */
import { getRubros } from "../actions/rubroActions";
import { getAnuncios } from "../actions/anunciosActions";
import { getAreaById } from '../actions/areasActions'

/* Font-awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSearch,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";

const HomeProfesional = ({
  auth,
  history,
  onGetRubros,
  rubros,
  anuncios,
  onGetAnuncios,
  onGetAreaById,


}) => {
  const [chips, setChips] = useState([]);

  const [rubrosState, setRubrosState] = useState([]);

  const [valueInput, setValueInput] = useState("");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setToast(false);
  //   }, 6000);
  // }, []);

  /* Cuando abandona la view */
  useEffect(() => {
    return () => {
      if (history.action == "POP") {
        window.location.href = "/home";
      }
    };
  }, []);

  useEffect(() => {

    onGetAnuncios();

    /* Hacer peticion si aun no tenemos los rubros en redux */
    if (rubros.rubros.length <= 0) {
      onGetRubros();
    }

    setChips((oldValues) => [...oldValues, { value: "Todas las categorias", id: 0 }]);
  }, []);

  useEffect(() => {
    if (rubros.rubros.length > 0) {
      let newValue = rubros.rubros.map((v) => {
        return {
          nombre: v.nombre,
          isChecked: false,
          id: v.rubro_id
        };
      });

      newValue.unshift({ nombre: "Todas las categorias", isChecked: true, id : 0 });

      setRubrosState(newValue);
    }
  }, [rubros.rubros]);

  /* Use Effect solo para escuchar a anuncios */
  useEffect(() => {

    if(anuncios.anuncios.length) {
      console.log("ANUNCIOS", anuncios.anuncios)


    }

  }, [anuncios.anuncios]  )

  useEffect(() => {

    console.log("HISTORY", history)

    console.log("CHIPS", chips)

    let query = "?"
      
    if(chips.length > 0) {

      chips.map( (v, i) => {
        console.log("VALOR ", v)
        query += "b"  +i + "=" + v.id + "&"
      })

      history.push(({
        pathname: '/home',
        search: query
      }))

      onGetAnuncios(query)

    } else {
      history.push({
        patname: '/home',
        search: ''
      })

      onGetAnuncios("")
    } 

  }, [chips])


  const getRubroByAnuncio = (rubroId) => {
    console.log("RUBROS RUBROS", rubros.rubros.find(v => v.rubro_id == rubroId))
    return (
      <div>
        {rubros.rubros.find(v => v.rubro_id == rubroId).nombre} 
      </div>
    )
  }

  const changeCombo = (v, index, evento) => {

    console.log("VALOR", v)

    if (evento.target.checked) {
      // if(chips.length > 2) {
      //   toast.error("Solo puedes Seleccionar 3 Categorias")
      // } else {
      let values = [...rubrosState];
      values[index].isChecked = evento.target.checked;
      setRubrosState(values);
      setChips((oldValues) => [...oldValues, { value: v.nombre, id: v.id }]);
      // }
    } else {
      let valor = [...rubrosState];
      valor[index].isChecked = evento.target.checked;
      setRubrosState(valor);
      let newValue = chips.filter((value) => value.value !== v.nombre);
      setChips(newValue);
    }
  };

  const onSearch = () => {

    console.log("VER VALOR", history.location)

    if (chips.length <= 0 && valueInput === "") {
      toast.warn("Ingrese algun filtro");
    } else {

      // history.push({
      //   patname: '/home',
      //   search: history.location.search + "value="+ valueInput
      // })

      let query = "?"
      

      chips.map( (v, i) => {
        query += "b"  +i + "=" + v.id + "&"
      })

      history.push(({
        pathname: '/home',
        search: query + "value=" + valueInput
      }))

      onGetAnuncios(history.location.search)

    }
  };

  const deleteChip = (value, index) => {
    setChips(chips.filter((v, i) => i !== index));

    let getRubroIndex = rubrosState.findIndex((v) => v.nombre === value.value);

    let updateState = [...rubrosState];

    updateState[getRubroIndex].isChecked = false;

    setRubrosState(updateState);

  };

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <header>
        <Carousel fade={true}>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src="https://menaalliances.com/wp-content/uploads/2016/04/03-Notebook.jpg"
              alt="First slide"
              style={{ height: "80vh" }}
            />
            <Carousel.Caption>
              <h3>Consigue trabajo</h3>
              <p>Sin necesidad de ir al lugar</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1601129490376-e24f32ed8024?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt="Third slide"
              style={{ height: "80vh" }}
            />
            <Carousel.Caption>
              <h3>Trabaja</h3>
              <p>De una forma rapida y segura.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://ak.picdn.net/shutterstock/videos/12015494/thumb/1.jpg"
              alt="Third slide"
              style={{ height: "80vh" }}
            />
            <Carousel.Caption>
              <h3>Aumenta tu reputacion</h3>
              <p>Con una mejor reputacion podras conseguir mas trabajos.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </header>

      <Container style={{ marginTop: "40px", height: "100vh" }}>
        <Row>
          <Col lg={4}>
            <Card
              className="shadow p-3 mb-5 bg-white rounded"
              style={{ width: "18rem" }}
              className="card-home-profesional"
            >
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                {rubros.rubros.length > 0
                  ? rubrosState.map((v, i) => {
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label>
                            {" "}
                            <input
                              type="checkbox"
                              checked={v.isChecked}
                              onChange={(e) => changeCombo(v, i, e)}
                            />{" "}
                            {v.nombre}
                          </label>
                        </div>
                      );
                    })
                  : null}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8} style={{ height: "100vh" }}>
            <InputGroup className="mb-3 shadow">
              <FormControl
                placeholder="Busca trabajo"
                onChange={(e) => setValueInput(e.target.value)}
              />
              <InputGroup.Append onClick={() => onSearch()}>
                <InputGroup.Text id="basic-addon2">
                  {anuncios.isLoading ? (
                    <Spinner
                      animation="border"
                      variant="success"
                      style={{ width: "20px", height: "20px" }}
                    >
                      {" "}
                    </Spinner>
                  ) : (
                    <FontAwesomeIcon icon={faSearch} />
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>

            {/* <Row style = {{ marginTop: '30px' }}> */}

            {chips.length > 0 ? (
              <div className="chips-home-user">
                {chips.map((v, i) => {
                  return (
                    <div
                      className="chips-container-home-user"
                      style={{ backgroundColor: "#18D735" }}
                    >
                      <div className="chip-element-user">
                        <label>{v.value}</label>
                        <FontAwesomeIcon
                          className="icon-rubro-container"
                          icon={faTimesCircle}
                          onClick={() => deleteChip(v, i)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null }
            {/* </Row> */}
              
            {  /* Aqui ira el mapeo de los anuncios */ }   
            { anuncios.anuncios.length > 0 ?  ( 
              
              anuncios.anuncios.map((v, i) => {
                return (
                  
              <Card style = {{ marginTop: '30px', borderColor: 'green', borderWidth: '3px' }} className = "shadow">
              <Card.Body>
                <div className = "titulo-container">
                <Card.Title style = {{ width : '60%' }}>{ v.titulo }</Card.Title>
                <Button variant="success" style = {{ borderRadius: '30px', height: '38px' }}>Enviar Propuesta</Button>
                </div>
                <Card.Text style = {{ marginTop: '10px'}}>
                  { v.descripcion }
                </Card.Text>
                
                <div className="chips-home-user">
                
                { v.area_Info.map(area => {
                  return (
                    <div
                      className="chips-container-post-user"
                      style={{ backgroundColor: "#18D735" }}
                    >
                      <div className="chip-element-user">
                        <label>{area.nombre}</label>
                      </div>
                    </div>
                  )
                }) }
                </div>

                <div style = {{ display: 'flex', flexDirection: 'row',  marginTop: '25px' }}>
                <label style = {{ marginRight: '5px' }}> 
                <strong>Categoria: </strong>
                </label> 
                <label>{getRubroByAnuncio(v.rubro_id)} </label>
                </div>
                
               
                <label style = {{ marginTop: '15px', display: 'block' }} ><strong>Disponibilidad:</strong> { v.disponibilidad } </label>
                <label style = {{ marginTop: '15px', display: 'block' }} ><strong>Publicado por:</strong> {v.username_freelancer}</label>
                


                {/* <Button variant="primary">Go somewhere</Buttonn> */}
              </Card.Body>
            </Card>
                )
              })

              ) : <h1 style = {{ textAlign: 'center', marginTop: '20%' }}>No hay anuncios disponibles</h1> }
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth, rubros, anuncios } = state;

  return {
    auth,
    rubros,
    anuncios,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRubros: () => {
      dispatch(getRubros());
    },
    onGetAnuncios: (query) => {
      dispatch(getAnuncios(query));
    },
    onGetAreaById: (id) => {
      dispatch(getAreaById(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeProfesional);
