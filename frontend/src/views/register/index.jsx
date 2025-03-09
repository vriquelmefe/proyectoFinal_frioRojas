import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

function Register() {
  
  const apiURL = import.meta.env.VITE_API_URL
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
    },
  });

  const [registerError, setRegisterError] = useState("");

  const handleRegister = async (formData) => {
    try {
      // const response = await fetch("http://localhost:3000/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      const response = await fetch(`${apiURL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Usuario ya existe");
        } else if (response.status === 500) {
          throw new Error("Error del servidor");
        } else {
          throw new Error("Error en la solicitud");
        }
      }

      const result = await response.text();
      console.log(result);
      navigate("/");
      alert("Usuario registrado con éxito");
    } catch (error) {
      console.error("Error:", error);
      if (error.message === "Usuario ya existe") {
        setRegisterError(
          "Ya existe un usuario con ese email. Por favor, intenta con otro."
        );
      } else if (error.message === "Error del servidor") {
        setRegisterError("Error del servidor. Por favor, intenta más tarde.");
      } else {
        setRegisterError(
          "En este momento no es posible registrar el usuario. Por favor, intenta más tarde."
        );
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="row g-6">
                <div
                  className="col-md-4 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: "#1D1F3D" }}
                >
                  <img
                    src="/logo.png"
                    className="img-fluid rounded-start"
                    alt="Imagen de registro"
                  />
                </div>
                <div className="col-md-8">
                  <div
                    className="card-header text-white text-center"
                    style={{ backgroundColor: "#1D1F3D" }}
                  >
                    <h3>Formulario de registro</h3>
                  </div>
                  <div className="card-body p-4">
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
                          {...register("nombre", {
                            required: "El nombre es obligatorio",
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="nombre"
                          as="p"
                          className="text-danger"
                        />
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
                        <ErrorMessage
                          errors={errors}
                          name="email"
                          as="p"
                          className="text-danger"
                        />
                      </div>
                      {/*<div className="mb-3">
                        <label htmlFor="rol" className="form-label">
                          Rol
                        </label>
                        <input
                          id="rol"
                          type="text"
                          placeholder="Rol de Registro"
                          className="form-control"
                          {...register("rol", {
                            required: "El rol es obligatorio",
                          })}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="rol"
                          as="p"
                          className="text-danger"
                        />
                      </div>*/}
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
                        <ErrorMessage
                          errors={errors}
                          name="password"
                          as="p"
                          className="text-danger"
                        />
                      </div>

                      {registerError && (
                        <p className="text-danger">{registerError}</p>
                      )}

                      <div className="d-grid">
                        <input
                          type="submit"
                          className="btn btn-primary text-decoration-none"
                          value="Registrar"
                          style={{
                            backgroundColor: "#1D1F3D",
                            borderColor: "#1D1F3D",
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
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
