import axios from "axios";

const devAPIServer = "http://wheelofstandup-api-dev.azurewebsites.net/Wheel";

export function spinWheel() {
  return axios.post(devAPIServer + "/spin");
}

export function getAllSpins() {
  return axios.get(devAPIServer + "/spins");
}

export function resetWheel() {
  return axios.post(devAPIServer + "/reset");
}
