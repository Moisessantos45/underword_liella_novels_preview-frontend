import { useState, useEffect, createContext } from "react";
import Loading from "../components/Loading";
import urlAxios from "../config/urlAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setAuth] = useState({});
  const [userCont, setCont] = useState(0);
  const [ultimosCapitulo, setEndChapters] = useState([]);
  const [ultimosCards, setEndCards] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [userType, setUserType] = useState("");
  const [count, setCount] = useState(0);
  const [visitas_actuales, setVisitas] = useState(0);

  useEffect(() => {
    const autenticar = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        localStorage.removeItem("horaInicio");
        return <redirect to="/login-admin" />;
      }
      const confi = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { token },
      };
      try {
        const { data } = await urlAxios(
          `/underwordliellanovels/panel-administracion`,
          confi
        );
        setUserType(data.usuario.tipo);
        setAuth(data.usuario);
        setCont(data.totalUsuarios);
        setEndChapters(data.ultimosCapitulos);
        setEndCards(data.ultimasCards);
        setVisitas(data.visistas_actuales);
      } catch (error) {
        setAuth({});
        localStorage.removeItem("token");
      }
      setCargando(false);
    };
    autenticar();
  }, []);

  if (cargando) return <Loading />;
  return (
    <AuthContext.Provider
      value={{
        userAuth,
        setAuth,
        cargando,
        userType,
        userCont,
        ultimosCapitulo,
        ultimosCards,
        count,
        setCount,
        setCargando,
        visitas_actuales,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
