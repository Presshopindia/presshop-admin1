import axios from 'axios';
const BASE_URL = "https://uat.presshop.live:5020/"


export function getToken() {

  if (localStorage.getItem("remember_me") && localStorage.getItem("remember_me") === "yes") {
    return localStorage.getItem("token")

  } if (localStorage.getItem("remember_me") && localStorage.getItem("remember_me") === "no") {

    return localStorage.getItem("token")

  } else {


    return null

  }
}
export async function isAuthenticated() {

  if (localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "yes") {

    return localStorage.getItem('isLogged') === "true"

  } if (localStorage.getItem("remember_me") && localStorage.getItem("remember_me") == "no") {

    return localStorage.getItem('isLogged') === "true"

  } else {

    return false

  }
}

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) { // if token avaiable
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return Promise.resolve(config);
  },
  (error) => {
    Promise.reject(error)

  }
);


export async function Get(url, body, limit = 100, offset = 0) {
  const params = {
    limit: limit,
    offset: offset
  }
  try {
    var res = await axios.get(`${BASE_URL}${url}`, body, params );
    return res;
  } catch (error) {

    throw (error)
  }
}

export async function Post(url, body, params) {
  try {
    var res = await axios.post(`${BASE_URL}${url}`, body, params);
    return res;
  } catch (error) {

    throw (error)
  }
}

export async function Delete(url, body) {
  try {
    var res = await axios.delete(`${BASE_URL}${url}`, body);
    return res;
  } catch (error) {

    throw (error)
  }
}

export async function Patch(url, body) {
  try {
    var res = await axios.patch(`${BASE_URL}${url}`, body);
    return res;
  } catch (error) {

    throw (error)
  }
}

export async function UploadFile (path, data) {
  try{
    const formData = new FormData();
    formData.append("path", path);
    formData.append("images", data);
    const result = await axios.post(`${BASE_URL}admin/upload/data`, formData);
    return result.data
  }
  catch(error){
    throw (error)
  }
}