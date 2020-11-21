/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* Components */
import NavBar from "../components/navBar";

/* Actions */
import { getAnuncioByUser } from "../actions/anuncioUser";

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
                  <Card style = {{ minHeight: '300px' }}>
                    <Card.Body>
                      <Card.Title>{v.titulo}</Card.Title>
                      <Card.Text>
                        {v.descripcion}
                      </Card.Text>
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
      <h1>Publicaciones</h1>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
