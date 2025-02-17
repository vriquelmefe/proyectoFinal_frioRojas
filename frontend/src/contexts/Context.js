import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const [tokenData, setTokenData] = useState(localStorage.getItem("token"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToken = (updateToken) => {
    setToken(updateToken);
  };

  const handleUser = (updateUser) => {
    setUser(updateUser);
  };

  const handlePass = (updatePass) => {
    setPass(updatePass);
  };

  const handleTokenData = (updateTokenData) => {
    setTokenData(updateTokenData);
  };

  /*useEffect(() => {
    if (!tokenData) return;
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error en la identificacion");
        }

        const userData = await response.json();
        setUser(userData);
        console.log("User Data:", userData);
      } catch (error) {
        console.error("Error al obtener la informaciondel usuario:", error);
        setUser(null);
      }
    };

    fetchUserData();*/

  /*
    localStorage.getItem("token")
      ? setTokenData(localStorage.getItem("token"))
      : null;
  }, [tokenData]);*/

  /*useEffect(() => {
    const fetch publicaciones = async () => {
      try {
        const response = await fetch("http://localhost:3000/publicaciones");
        const data = await response.json();
        setPizza(data);
      } catch (err) {
        setErr(err);
      }
    };

    fetchPizza();
  }, []);*/

  const logOut = () => {
    // console.log("por aqui paso");
    handleToken(null);
    handleUser(null);
    setTokenData(null);
    localStorage.removeItem("token");
  };

  //useEffect(() => {
  //console.log(token, user);
  //}, [token, user]);

  const validateUser = async (url, user, pass) => {
    //const fetchData = async () => {

    setLoading(true);
    setError(null);

    try {
      //console.log(user, pass, url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          password: pass,
        }),
      });
      //console.log(response);
      if (!response.ok) {
        // console.log(response);

        const errorMessage = await response.text();
        throw new Error(
          `Error al conectar con la url ${url} : ${errorMessage}`
        );
      }
      const data = await response.json();

      setData(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setError(error.message);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const ValidateProfile = async () => {
    useEffect(() => {
      const fetchUserData = async () => {
        if (tokenData) {
          try {
            const response = await fetch("http://localhost:3000/auth/me", {
              headers: {
                Authorization: `Bearer ${tokenData}`,
              },
            });
            // .then((response) => response.json())
            //.then((data) => setUser(data));
            //console.log(response);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            //const data = await response.json();
            //setUser(data);
            //console.log(data, tokenData, response);
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        }
      };
      fetchUserData();
    }, []);
  };

  return (
    <Context.Provider
      value={{
        token,
        handleToken,
        user,
        handleUser,
        pass,
        handlePass,
        tokenData,
        handleTokenData,
        logOut,
        data,
        loading,
        error,
        validateUser,
        ValidateProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
