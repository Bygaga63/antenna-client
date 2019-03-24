import axios from "axios";

const AuthService = {
  setJWTToken: token => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      if (localStorage.jwtToken === null || localStorage.jwtToken === undefined) {
        localStorage.setItem("jwtToken", token);
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }
}

export default AuthService;
