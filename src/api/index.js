import Axios from "axios";
import { toast } from "react-toastify";
import { API_SERVER } from "../config/constant";

const axios = Axios.create({
  baseURL: `${API_SERVER}`,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user")
    if (user) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return Promise.resolve(config);
  },
  (error) => {
    Promise.reject(error)
  }
);

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {

    if (error.response.status == 401 && error.response.data == "Unauthorized") {
      toast.error("Session Expired, Plesse login again");
      window.location.reload();
      window.location.href = "/"
    } else {
      if (typeof error.response.data == "string") {
        toast.error(error.response.data.errors.msg[0].msg, {
          position: toast.POSITION.TOP_CENTER
        })
      } else if (typeof error.response.data == "object") {
        toast.error(error.response.data.errors.msg, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
    return Promise.reject(error);
  }
);


export default axios;

