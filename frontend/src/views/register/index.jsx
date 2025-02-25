import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from 'axios'
import { ENDPOINT } from '../../config/constants'

function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      apellido: "",
      email: "",
      email_confirmation: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");
  const email = watch("email");

  const handleRegister = (formData) => {

    axios.post(ENDPOINT.register, formData)
      .then(() => {
        console.log('entre')
        window.alert('Usuario registrado con éxito 😀.')
        //navigate('/login')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        window.alert(`${data.message} 🙁.`)
      })

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
                          {...register("name", {
                            required: "El nombre es obligatorio",
                          })}
                        />
                        <ErrorMessage errors={errors} name="name" as="p" className="text-danger" />
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
                        <ErrorMessage errors={errors} name="apellido" as="p" className="text-danger" />
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
                        <ErrorMessage errors={errors} name="email" as="p" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email_confirmation" className="form-label">
                          Confirmar E-mail
                        </label>
                        <input
                          id="email_confirmation"
                          type="text"
                          placeholder="Confirmar Email"
                          className="form-control"
                          {...register("email_confirmation", {
                            required: "La confirmación del email es obligatoria",
                            validate: (value) =>
                              value === email || "Los emails no coinciden",
                          })}
                        />
                        <ErrorMessage errors={errors} name="email_confirmation" as="p" className="text-danger" />
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
                              message: "El password debe tener al menos 8 caracteres",
                            },
                          })}
                        />
                        <ErrorMessage errors={errors} name="password" as="p" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password_confirmation" className="form-label">
                          Repetir Password
                        </label>
                        <input
                          id="password_confirmation"
                          type="password"
                          placeholder="Repetir Password"
                          className="form-control"
                          {...register("password_confirmation", {
                            required: "La confirmación del password es obligatoria",
                            validate: (value) =>
                              value === password || "Los passwords no coinciden",
                          })}
                        />
                        <ErrorMessage errors={errors} name="password_confirmation" as="p" className="text-danger" />
                      </div>
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
