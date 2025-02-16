import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "../../contexts/Context";
import { useContext } from "react";
function Login() {
  const { logOut, tokenData, token } = useContext(Context);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark no-margin no-padding navegation"
      style={{ background: "black" }}
    >
      <div className="container-fluid">
        <h3 className="navbar-brand ms-2" href="#">
          Pizzeria Mamma Mia!
        </h3>
        <Link
          className="btn btn-outline-light me-2 transparent-btn d-flex align-items-center"
          to="/"
        >
          <img src="../img/pizza3.png" className="icon" alt="Pizza" />
          HOME
        </Link>
        <div className="navbar navbar-expand-lg navbar-dark no-margin no-padding navegation">
          {tokenData || token ? (
            <>
              <Link
                className={`btn btn-outline-light me-2 transparent-btn d-flex align-items-center `}
                type="button"
                id="Profile"
                to="/profile"
              >
                <img
                  src="../img/candado abierto.png"
                  className="icon"
                  alt="Profile"
                />
                Profile
              </Link>
              <Link
                className={`btn btn-outline-light me-2 transparent-btn d-flex align-items-center `}
                type="button"
                id="Logout"
                onClick={() => {
                  logOut();
                }}
                to="/"
              >
                <img
                  src="../img/candado cerrado.png"
                  className="icon"
                  alt="LogOut"
                />
                LogOut
              </Link>
            </>
          ) : (
            <>
              <Link
                className={`btn btn-outline-light me-2 transparent-btn d-flex align-items-center `}
                type="button"
                id="Login"
                //onClick={() => setShowModalLogin(true)}
                to="/login"
              >
                <img
                  src="../img/candadoConLlave2.png"
                  className="icon"
                  alt="Login"
                />
                Login
              </Link>

              <Link
                className={`btn btn-outline-light me-2 transparent-btn d-flex align-items-center `}
                type="button"
                id="Register"
                //onClick={() => setShowModal(true)}
                to="/register"
              >
                <img
                  src="../img/candadoConLlave3.png"
                  className="icon"
                  alt="Register"
                />
                Register
              </Link>
            </>
          )}
          ;
        </div>

        <div className="container d-flex justify-content-end">
          <Link
            className="btn btn-outline-light me-2 mt-1 gap-4 p-0  transparent-btn d-flex column justify-content-center align-items-center"
            type="button"
            to="/Cart"
          >
            <p> 🛒 Total: ${getTotal()}</p>

            <p>Cantidad: {getQuantity()} U </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Login;
