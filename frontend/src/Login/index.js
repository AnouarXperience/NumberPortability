import React, { useState } from 'react';
import { useLocalState } from '../util/uselocalStorage';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// import './index.css';

const Login = () => {
        const [jwt, setJwt] = useLocalState("", "jwt");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();


    function sendLoginRequest() {
      // Check if username or password is empty
  if (!username || !password) {
    alert('Username and password are required.');
    return;
  }
    const reqBody = {
      username: username,
      password: password,
    };

   
    fetch("api/log/login", {
      headers: {
         "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers])
        else
          return Promise.reject("Invalid login attempt");
      }) 
      .then(([body, headers]) => { 
          setJwt(headers.get("authorization"));
          window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
        //console.error("Error fetching data:", error);
      });
    }
   
        
    
    return (
              <Container fluid className="p-3 my-5 h-custom">
      <Row>
        <Col col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </Col>
        <Col col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in</p>           
          </div>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>
          <Form>
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
            </Form.Group>
            <div className="d-flex justify-content-between mb-4">
              <Form.Check
                type="checkbox"
                label="Remember me"
                id="rememberMe"
              />
              <a href="!#">Forgot password?</a>
            </div>
            <div className='text-center text-md-start mt-4 pt-2'>
              <Button className="mb-0 px-5" size='lg' onClick={() => sendLoginRequest()}>
                Login
              </Button>         
            </div>
          </Form>
        </Col>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary mt-5">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
      </div>
      </Row>
    </Container>
    );
};

export default Login;