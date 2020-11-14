/* React importaciones */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

/* Actions */
import { getRubros } from '../actions/rubroActions'
import {  getAreas } from '../actions/areasActions'


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
import {
  faCheckCircle,
  faSearch,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

/* Otros */
import Autosuggest from "react-autosuggest";

const Rubro = (props) => {

  useEffect(() => {
   props.onGetRubros()    
  }, [])

  /* Peticion a la base de datos */
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

  const [rubroValue, setRubroValue] = useState(null)

  const [experiencia, setExperiencia] = useState([
    "menos de 1 año",
    "entre 1 y 3 años",
    "4 a 6 años",
    "mas de 7 años",
  ]);

  const [experienciaSelected, setExperienciaSelected] = useState("Experiencia")

  const[experienciaTemp, setExperienciaTemp] = useState("")

  const [chips, setChips] = useState([]);

  const [estadoChip, setEstadoChip] = useState("new")

  useEffect(() => {

    if( chips.length > 0 && estadoChip === "new") {

      let value = {
        area: chips[chips.length-1].value,
        experiencia: experienciaTemp
      }

      setInfoUser(oldValues =>  ( { ...oldValues, info : [...oldValues.info, value] } ))

    }

  }, [chips])

  // const[textInput, setTextInput] = useState("")

  const [disableButton, setDisableButton] = useState(false);

  const [colors, setColors] = useState([
    "#1878D7",
    "#D71843",
    "#B418D7",
    "#18D735",
  ]);

  const [infoUser, setInfoUser] = useState({
    rubro: "",
    info: []
  });

  const [value, setValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const rubroSelected = (rubro, index) => {

    setChips([])

    setRubroIndex(index);
    setRubroValue(rubro)

    /* Consulta al back */
    props.onGetAreas(rubro.rubro_id)
    

  };

  const addTag = () => {

    setEstadoChip("new")

    setExperienciaTemp(experienciaSelected)

    if (chips.length >= 3) {
      setDisableButton(true);
    }

    let checkIfExist = chips.find((v) => v.value === value)

    if (!checkIfExist) {
      
      setChips((oldArray) => [
        ...oldArray,
        { value, colors: colors[Math.floor(Math.random() * 4) + 0]},
      ]);
  
  
      setValue("")
      setExperienciaSelected("Experiencia")
    }


  };  

  const onSaveUser =  () => {

    /* Llevar a Redux */
    setInfoUser(oldValue =>  ( {...oldValue, rubro: rubroValue } ) )

  }

  const deleteChip = (i) => {

    setEstadoChip("edit")

    // estadoChip = "edit"

    setChips(chips.filter((v, index) => index !== i));

    setInfoUser(oldValues => ({ info: oldValues.info.filter((v, index) =>  index !== i )  }) )



    if (chips.length < 5) {
      setDisableButton(false);
    }
  };

  // const languages = [
  //   {
  //     name: "C",
  //     year: 1972,
  //   },
  //   {
  //     name: "Elm",
  //     year: 2012,
  //   },
  //   {
  //     name: "E",
  //   },
  // ];

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : props.areas.filter(
          (lang) => lang.nombre.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.nombre;

  const renderSuggestion = (suggestion) => <div>{suggestion.nombre}</div>;

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Ingrese su area",
    value,
    onChange: onChange,
  };

  return (
    <div style={{ height: "100vh" }}>
      {    console.log("PROPS PRUEBA", props)
 }
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

                {  props.rubros ? props.rubros.map((v, i) => {
                  return (
                    <Col style={{ marginTop: "20px" }} lg={3}>
                      <Card
                        style={{ padding: "10px" }}
                        className={i === rubroIndex ? "selected" : null}
                        onClick={() => rubroSelected(v, i)}
                      >
                        <div className="rubro-container">
                          <label className="label-rubro">{v.nombre}</label>

                          {i === rubroIndex ? (
                            <div className="style-icon-rubro">
                              <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                          ) : null}
                        </div>
                      </Card>
                    </Col>
                  );
                }) : null }
              </Row>

              {rubroIndex !== null ? (
                <div>
                  <h3 style={{ marginTop: "30px" }}>
                    Cuales son las areas en las que te especializas
                  </h3>

                  <Row>
                    <Col lg={7}>
                      {/* <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Buscar Area"
                          className="input-rubro"
                          onChange={(e) => onChangeText(e.target.value)}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">
                            <FontAwesomeIcon icon={faSearch} />
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup> */}

                      <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={
                          onSuggestionsFetchRequested
                        }
                        onSuggestionsClearRequested={
                          onSuggestionsClearRequested
                        }
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                      />
                    </Col>

                    <Col lg={5}>
                      <div className="right-rubro">
                        <Dropdown style={{ width: "60%" }}>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            style={{ width: "100%" }}
                          >
                            {experienciaSelected}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {experiencia.map((v) => {
                              return <Dropdown.Item onClick = { () => setExperienciaSelected(v) } >{v}</Dropdown.Item>;
                            })}
                          </Dropdown.Menu>
                        </Dropdown>

                        <Button
                          className="button-rubro"
                          disabled={disableButton || value === "" || experienciaSelected === "Experiencia" }
                          onClick={() => addTag()}
                        >
                          Agregar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : null}
              

              {chips.length > 0 ? (
                <div className="chips-rubro">
                  {chips.map((v, i) => {
                    return (
                      <div
                        className="chips-container"
                        style={{ backgroundColor: v.colors }}
                      >
                        <div className="chip-element-rubro">
                          <label>{v.value}</label>
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

              <div className="buttons-rubro">
                <Button
                  onClick={() => props.history.push("/registro/postregister")}
                  className="button-rubro"
                >
                  Anterior
                </Button>
                <Button
                  disabled={chips.length <= 0 ? true : false}
                  className="button-rubro"
                  onClick = {() => onSaveUser() }
                >
                  Siguiente
                </Button>
              </div>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {

  const { rubros, areas } = state

  console.log("RUBROS", rubros)

  return {
    rubros: rubros.rubros,
    areas: areas.areas
  }

};

const mapDispatchToProps = (dispatch) => {

  return {
    onGetRubros: () => {
      dispatch(getRubros())
    },
    onGetAreas: (rubro_id) => {
      dispatch(getAreas(rubro_id))
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps) (Rubro);
