import React, {useState} from "react";
import {Button, Form, Alert} from "react-bootstrap";
import {useAuth} from "../../Providers/AuthProvider";
import {baseUrl} from "../../Utils/Links";

export const Login = () => {
  const {login} = useAuth();
  const loginApi = baseUrl + 'api/v1/token'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState({});

  const onLogin = async () => {
    await fetch(loginApi, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(response => response.json())
      .then(async data => {
        if (data.message) {
          setError(data)
          return;
        }
        await login(data.access_token)
      })
  }

  return (
    <div className={'container w-50'}>
      <p className={'text-center mt-5'}>Авторизация</p>
      <div className={'justify-content-center align-items-center d-flex'}>
        <Form className={'w-50 mt-3'}>
          {error.message && <Alert variant={error.level}>
            {error.message}
          </Alert>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </Form.Group>

          <Button
            variant="outline-primary"
            className={'w-100 mt-3'}
            onClick={onLogin}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}
