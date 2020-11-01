import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'

const Home = ({ auth, history }) => {

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

const mapStateToProps = (state) => {

    const { auth } = state

    return {
        auth
    }
}



export default connect(mapStateToProps, null) (Home)