import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {baseUrl} from "../../Utils/Links";
import {Link, useHistory} from "react-router-dom";

export const Registration = () => {
  const history = useHistory();
  const registrationApi = baseUrl + 'api/v1/users'
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState({});

  const onRegistration = async () => {
    await fetch(registrationApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: email,
        Username: username,
        Password: password,
      })
    })
      .then(response => response.ok
        ? history.push('/login')
        : setError({message: 'Some value are incorrect', level: 'danger'})
      )
  }

  return (
    <div className={'container w-50'}>
      <p className={'text-center mt-5'}>Sign up</p>
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

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={event => setUsername(event.target.value)}
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

          <Link to={'/registration'} className={'text-decoration-none'}>Sign in</Link>
          <Button
            variant="outline-primary"
            className={'w-100 mt-3'}
            onClick={onRegistration}
          >
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  )
}
