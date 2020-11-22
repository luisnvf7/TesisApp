/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* Components */
import NavBar from "../components/navBar";

/* Actions */
import { getAnuncioByUser, deleteAnuncioById } from "../actions/anuncioUser";

/* React boostrap */
import {
  Col,
  Row,
  FormControl,
  Button,
  Container,
  Image,
  Card,
} from "react-bootstrap";

import "../styles/PageStyles/anuniosUser.css" 

const Publicaciones = (props) => {
  useEffect(() => {
    props.onHandleGetUserPost();
  }, []);

  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          {props.useranuncios.userAnuncios.length > 0 ? (
            props.useranuncios.userAnuncios.map((v) => {
              return (
                <Col md={4}>
                  <Card style = {{ marginTop: '30px' }} >
                      <Card.Body >
                        <div style = {{ height: '70px' }}>
                      <Card.Title>{v.titulo}</Card.Title>
                      <Card.Text>
                        {v.descripcion}
                      </Card.Text>

                        </div>
                      {/* <button >Sexo</button> */}
                      <Button variant="danger" style = {{ marginTop: '200px' }} onClick = { () => props.onDeleteUserPost(v.anuncio_id) } >Eliminar</Button>
                      <Button variant="warning" style = {{ marginTop: '200px', marginLeft: '5px' }}>Editar</Button>
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
      dispatch(deleteAnuncioById(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
