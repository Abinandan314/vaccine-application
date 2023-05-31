import axios from "axios";

const API_URL = "http://localhost:8080/user/";
const API_URL_1 = "http://localhost:8080/admin/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      password,
    });
  };
  const adminRegister = (username, email, password) => {
    return axios.post(API_URL_1 + "signup", {
      username,
      password,
    });
  };
  const login = (username, password) => {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.username) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }

        console.log(response.data);
        return response.data;
      });
  };
  const adminLogin = (username, password) => {
    return axios
      .post(API_URL_1 + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.username) {
          sessionStorage.setItem("admin", JSON.stringify(response.data));
        }

        console.log(response.data);
        return response.data;
      });
  };
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("admin");
    return axios.post(API_URL + "signout").then((response) => {
      return response.data;
    });
  };
  
  const AuthService = {
    register,
    adminLogin,
    adminRegister,
    login,
    logout
  }

export default AuthService;