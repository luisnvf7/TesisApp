import React, { useState } from "react";

import { Image, Container } from "react-bootstrap";

const RightSide = ({ src }) => {

    return (
        <Container style = {{ padding: 0}}>
            <Image  style = {{ width: '70%', height: "70%" }} src = {src} />
        </Container>
    )

}

export default RightSide