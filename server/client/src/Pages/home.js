/* React importaciones */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

/* React Boostrap */
import { Toast } from "react-bootstrap";

/* CSS */
import "../styles/PageStyles/home.css";

const Home = ({ auth, history }) => {
  const [toast, setToast] = useState(true);

  const [count, setCount] = useState(0);


  useEffect(() => {
    setTimeout(() => {
      setToast(false);
    }, 6000);
  }, []);

  /* Cuando abandona la view */
  useEffect(() => {
    return () => {
      if(history.action == "POP") {
        window.location.href = "/home"
      }
    };
  }, []);

  return (
    <div>
      <Toast
        className="toast"
        animation={true}
        show={toast}
        onClose={() => setToast(false)}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Saludo</strong>
        </Toast.Header>
        <Toast.Body>
          Hola, {auth.user.nombre} espero que estes teniendo un maravilloso
          dia!.
        </Toast.Body>
      </Toast>
      <h1>Home</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth,
  };
};

export default connect(mapStateToProps, null)(Home);
