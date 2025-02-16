<<<<<<< HEAD:src/views/login/index.jsx

import { Card } from 'react-bootstrap'
=======
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, Form, Button } from 'react-bootstrap';
import { loginForm } from '../../types';
>>>>>>> 19a15352ca79d654d8ab59f0c68b137756e9ea6f:src/views/login/index.tsx

function Login() {

  const initialValues: loginForm = {
    email: '',
    password: ''
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const handleLogin = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="shadow-lg">
            <div className="row g-0">
              <div className="col-md-8">
                <Card.Body className="p-4">
                  {/* <Card.Title className="text-center mb-4">Login</Card.Title> */}
                  <Form onSubmit={handleSubmit(handleLogin)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email", { required: "Email is required" })}
                      />
                      {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                      />
                      {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </Form.Group>

                    <div className="d-grid">
                      <Button type="submit" style={{ backgroundColor: '#1D1F3D', borderColor: '#1D1F3D' }}>
                        Iniciar sesión
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </div>
              <div className="col-md-4">
                <img src="./public/logo.png" className="img-fluid rounded-end" alt="Imagen de login" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;