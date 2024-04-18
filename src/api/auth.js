import axios from "./index";

class AuthApi {
  static Login = (data) => {
    // return axios.post(`${base}/login`, data);
    return axios.post(`https://uat.presshop.live:5020/auth/admin/login`, data);
  };
  static Register = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

let base = "users";

export default AuthApi;
