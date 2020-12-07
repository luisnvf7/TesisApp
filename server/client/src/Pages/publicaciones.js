/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* Components */
import NavBar from "../components/navBar";

/* Actions */
import {
  getAnuncioByUser,
  deleteAnuncioById,
  updateAnuncioById,
  clearMessage,
  saveAnuncio
} from "../actions/anuncioUser";

import Autosuggest from "react-autosuggest";

import { getRubros } from "../actions/rubroActions";

import { getAreas } from "../actions/areasActions";

import {
  Container as Contenedor,
  Button as Boton,
} from "react-floating-action-button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

/* React boostrap */
import {
  Col,
  Row,
  Form,
  Button,
  Container,
  FormControl,
  Image,
  Card,
  Modal,
  Dropdown,
} from "react-bootstrap";

import "../styles/PageStyles/anuniosUser.css";

/* Otros */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Publicaciones = (props) => {
  const [isEditMode, setIsEditMode] = useState([]);

  const [postInfo, setPostInfo] = useState('');

  const [selectedRubro, setSelectedRubro] = useState({
    rubro_id: 0,
    nombre: "Seleccionar rubro",
  });

  const [anuncios, setAnuncios] = useState([]);

  const [show, setShow] = useState(false);

  const [isRenderInput, setIsRenderInput] = useState(false);

  const [value, setValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [chips, setChips] = useState([]);

  const [titulo, setTitulo] = useState('')

  const [descripcion, setDescripcion] = useState('')

  const [disponibilidad, setDisponibilidad] = useState('')

  const returnIcon = () => {
    return <FontAwesomeIcon icon={faPlus} />;
  };

  const handleClose = () => setShow(false);

  const onChangeEditMode = (index) => {
    let newValue = [...isEditMode];

    newValue[index] = !isEditMode[index];

    if (!newValue[index]) {
      let oldValue = [...props.useranuncios.userAnuncios];
      setAnuncios(oldValue);
    }

    setIsEditMode(newValue);
  };

  useEffect(() => {
    props.onHandleGetUserPost();

    if (props.rubros.rubros.length == 0) {
      props.onGetRubros();
    }
  }, []);

  useEffect(() => {
    if (props.useranuncios.userAnuncios.length > 0) {
      setIsEditMode(props.useranuncios.userAnuncios.map(() => false));
      setAnuncios(props.useranuncios.userAnuncios);
    }
  }, [props.useranuncios.userAnuncios]);

  useEffect(() => {
    if (props.useranuncios.msg !== "") {
      toast.success(props.useranuncios.msg);
      props.onClearMessage();
    }
  }, [props.useranuncios.msg]);

  useEffect(() => {
    if (selectedRubro.nombre !== "Seleccionar rubro") {
      props.onGetAreas(selectedRubro.rubro_id);

      setIsRenderInput(true);
    }
  }, [selectedRubro]);

  useEffect(() => {

    if (postInfo !== '') {

      props.onSendData(postInfo)

      props.onHandleGetUserPost();

      setShow(false)

    }

  }, [postInfo])

  const renderButtonsInEditMode = (v, i) => (
    <div>
      <Button
        variant="success"
        style={{ marginTop: "200px" }}
        onClick={() =>
          props.onUpdateUserPost(
            v.anuncio_id,
            anuncios[i],
            isEditMode,
            setIsEditMode,
            i
          )
        }
      >
        Guardar
      </Button>
      <Button
        variant="warning"
        style={{ marginTop: "200px", marginLeft: "5px" }}
        onClick={() => onChangeEditMode(i)}
      >
        Volver
      </Button>
    </div>
  );

  const renderItem = () => {
    if (props.rubros.rubros.length > 0) {
      return (
        <Dropdown
          drop="up"
          style={{ marginTop: "20px", width: "100%", marginBottom: "20px" }}
        >
          <Dropdown.Toggle
            style={{ width: "100%" }}
            variant="success"
            id="dropdown-basic"
          >
            {selectedRubro.nombre}
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ width: "100%" }}
            className="dropdown-register"
          >
            <div style={{ display: "flex", justifyContent: "center" }}></div>
            {props.rubros.rubros.map((value) => (
              <Dropdown.Item onClick={() => stateChange(value)}>
                {value.nombre}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  const stateChange = (valor) => {
    setSelectedRubro({ nombre: valor.nombre, rubro_id: valor.rubro_id });
  };

  const renderButtonsNormalMode = (v, i) => (
    <div>
      <Button
        variant="danger"
        style={{ marginTop: "200px" }}
        onClick={() => props.onDeleteUserPost(v.anuncio_id)}
      >
        Eliminar
      </Button>
      <Button
        variant="warning"
        style={{ marginTop: "200px", marginLeft: "5px" }}
        onClick={() => onChangeEditMode(i)}
      >
        Editar
      </Button>
    </div>
  );

  const changeValue = (value, propiedad, index) => {
    const valor = [...anuncios];

    valor[index] = {
      ...valor[index],
      [propiedad]: value,
    };

    setAnuncios(valor);
  };

  /* Suggestions Component */

  const getSuggestionValue = (suggestion) => suggestion.nombre;

  const renderSuggestion = (suggestion) => <div>{suggestion.nombre}</div>;

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : props.areas.filter(
          (lang) =>
            lang.nombre.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Ingrese su area",
    value,
    onChange: onChange,
  };

  /* FINALIZA SUGGEST */

  const addTag = () => {

    console.log("VALOR", value)

    console.log("AREAS", props.areas.find(v => v.nombre === value))

    let newValue = props.areas.find(v => v.nombre === value)

    setChips((oldValues) => [...oldValues, newValue]);
    setValue("")
  };

  const deleteChip = (i) => {

    setChips(chips.filter((v, index) => index !== i));

  }

  const sendData = () => {

    setPostInfo({
      titulo,
      descripcion,
      rubro_id: selectedRubro.rubro_id,
      area_id : chips.map(v => v.area_id ),
      disponibilidad
    })

  }

  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          {anuncios.length > 0 ? (
            anuncios.map((v, i) => {
              return (
                <Col md={4}>
                  <Card style={{ marginTop: "30px" }}>
                    <Card.Body>
                      <div style={{ height: "70px" }}>
                        {isEditMode[i] ? (
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={v.titulo}
                            onChange={(e) =>
                              changeValue(e.target.value, "titulo", i)
                            }
                          />
                        ) : (
                          // <FormControl
                          //   value = { v.titulo  }
                          // />
                          <Card.Title>{v.titulo}</Card.Title>
                        )}
                        {isEditMode[i] ? (
                          <Form.Control
                            style={{ marginTop: "40px" }}
                            as="textarea"
                            rows={3}
                            value={v.descripcion}
                            onChange={(e) =>
                              changeValue(e.target.value, "descripcion", i)
                            }
                          />
                        ) : (
                          <Card.Text>{v.descripcion}</Card.Text>
                        )}
                      </div>
                      {/* <button >Sexo</button> */}
                      {isEditMode[i]
                        ? renderButtonsInEditMode(v, i)
                        : renderButtonsNormalMode(v, i)}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <h1>No hay publicaciones disponibles</h1>
          )}
        </Row>
        <ToastContainer />
        <Contenedor>
          <Boton tooltip="Agregar" rotate={true} onClick={() => setShow(true)}>
            {returnIcon()}
          </Boton>
        </Contenedor>

        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar anuncio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl placeholder="Titulo" onChange = { (e) => setTitulo(e.target.value)  } />
              <FormControl
                style={{ marginTop: "20px" }}
                placeholder="Descripcion"
                onChange = { (e) => setDescripcion(e.target.value)  }
              />

              {renderItem()}

              {isRenderInput ? (
                <Row>
                  <Col lg={9}>
                    <Autosuggest
                      className="input-suggest-areas"
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={onSuggestionsClearRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps}
                    />
                  </Col>
                  <Col>
                    <Button onClick={() => addTag()}>Añadir</Button>
                  </Col>
                </Row>
              ) : null}

              {chips.length > 0 ? (
                <div className="chips-rubro">
                  {chips.map((v, i) => {
                    return (
                      <div
                        className="chips-container"
                        style={{ backgroundColor: 'green' }}
                      >
                        <div className="chip-element-rubro">
                          <label>{v.nombre}</label>
                          <FontAwesomeIcon
                            className="icon-rubro-container"
                            icon={faTimesCircle}
                            onClick={() => deleteChip(i)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <FormControl
                style={{ marginTop: "20px" }}
                placeholder="Disponibilidad"
                onChange = { (e) => setDisponibilidad(e.target.value) }
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick = { () => sendData() }>Guardar</Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth, isFirstRender, useranuncios, rubros, areas } = state;

  return {
    auth,
    isFirstRender,
    useranuncios,
    rubros,
    areas: areas.areas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleGetUserPost: () => {
      dispatch(getAnuncioByUser());
    },
    onDeleteUserPost: (id) => {
      dispatch(deleteAnuncioById(id));
    },
    onUpdateUserPost: (id, anuncio, isEditMode, setIsEditMode, i) => {
      dispatch(updateAnuncioById(id, anuncio, isEditMode, setIsEditMode, i));
    },
    onClearMessage: () => {
      dispatch(clearMessage());
    },
    onGetRubros: () => {
      dispatch(getRubros());
    },
    onGetAreas: (rubro_id) => {
      dispatch(getAreas(rubro_id));
    },
    onSendData: (data) => {
      dispatch(saveAnuncio(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
