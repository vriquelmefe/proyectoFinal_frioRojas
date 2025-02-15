import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { registerFrom } from '../../types'

function Register() {
  const initialValues : registerFrom = {
    name: "",
    apellido: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const email = watch("email");

  const handleRegister = (fromData : registerFrom) => {
    console.log(fromData);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white text-center">
                <h3>Registro</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(handleRegister)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Tu Nombre"
                      className="form-control"
                      {...register("name", {
                        required: "El nombre es obligatorio",
                      })}
                    />
                    {errors.name && (
                      <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">
                      Apellido
                    </label>
                    <input
                      id="apellido"
                      type="text"
                      placeholder="Tu Apellido"
                      className="form-control"
                      {...register("apellido", {
                        required: "El apellido es obligatorio",
                      })}
                    />
                    {errors.apellido && (
                      <ErrorMessage>{errors.apellido.message}</ErrorMessage>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email de Registro"
                      className="form-control"
                      {...register("email", {
                        required: "El email es obligatorio",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "El email no es válido",
                        },
                      })}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Confirmar E-mail
                    </label>
                    <input
                      id="email confirmation"
                      type="text"
                      placeholder="Confirmar Email"
                      className="form-control"
                      {...register("email_confirmation", {
                        required: "La confirmación del email es obligatorio",
                        validate: (value) =>
                          value === email || "Los emails no coinciden",
                      })}
                    />
                    {errors.email_confirmation && (
                      <ErrorMessage>
                        {errors.email_confirmation.message}
                      </ErrorMessage>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password de Registro"
                      className="form-control"
                      {...register("password", {
                        required: "El password es obligatorio",
                        minLength: {
                          value: 8,
                          message:
                            "El password debe tener al menos 8 caracteres",
                        },
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password_confirmation"
                      className="form-label"
                    >
                      Repetir Password
                    </label>
                    <input
                      id="password_confirmation"
                      type="password"
                      placeholder="Repetir Password"
                      className="form-control"
                      {...register("password_confirmation", {
                        required: "La confirmación del password es obligatorio",
                        validate: (value) =>
                          value === password || "Los passwords no coinciden",
                      })}
                    />
                    {errors.password_confirmation && (
                      <ErrorMessage>
                        {errors.password_confirmation.message}
                      </ErrorMessage>
                    )}
                  </div>
                  <div className="d-grid">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Crear Cuenta"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="mt-4 text-center">
        <Link to="/login" className="text-decoration-none">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  );
}

export default Register;
