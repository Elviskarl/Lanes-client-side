import { useState } from "react";
import PropTypes from "prop-types";
import authContext from "./authContext";

function AuthContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({
    loggedIn: false,
    userName: "",
    email: "",
  });

  return (
    <authContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </authContext.Provider>
  );
}

AuthContextProvider.propTypes = {
   children: PropTypes.node.isRequired,
};
export default AuthContextProvider;