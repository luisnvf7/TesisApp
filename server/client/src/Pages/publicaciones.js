/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* Components */
import NavBar from "../components/navBar";

/* Actions */
import { getAnuncioByUser, deleteAnuncioById, updateAnuncioById } from "../actions/anuncioUser";

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
} from "react-bootstrap";

import "../styles/PageStyles/anuniosUser.css";

const Publicaciones = (props) => {
  const [isEditMode, setIsEditMode] = useState([]);

  const [postInfo, setPostInfo] = useState({})

  const onChangeEditMode = (index) => {

    let newValue = [...isEditMode];

    newValue[index] = !isEditMode[index];

    setIsEditMode(newValue);

  };

  useEffect(() => {
    props.onHandleGetUserPost();
  }, []);

  useEffect(() => {
    if (props.useranuncios.userAnuncios.length > 0) {
      setIsEditMode(props.useranuncios.userAnuncios.map(() => false));
    }
  }, [props.useranuncios.userAnuncios]);

  const renderButtonsInEditMode = (v, i) => (
    <div>
      <Button
        variant="success"
        style={{ marginTop: "200px" }}
        onClick={() => props.onUpdateUserPost(v.anuncio_id)}
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

  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          {props.useranuncios.userAnuncios.length > 0 ? (
            props.useranuncios.userAnuncios.map((v, i) => {
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
            <h1>Sexo</h1>
          )}
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth, isFirstRender, useranuncios } = state;

  return {
    auth,
    isFirstRender,
    useranuncios,
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
    onUpdateUserPost: (id) => {
      dispatch(updateAnuncioById(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
