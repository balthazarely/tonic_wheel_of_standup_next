import axios from "axios";

const devAPIServer = "http://wheelofstandup-api-dev.azurewebsites.net";

export function getAllPeople() {
  return axios.get(devAPIServer + "/People");
}

export function addAPerson(userName: string) {
  return axios.post(devAPIServer + "/People", { name: userName });
}

export function deleteAPerson(userId: string) {
  return axios.delete(devAPIServer + "/People/" + userId);
}

export async function enableAPerson(userId: string) {
  return axios.post(devAPIServer + "/People/" + userId + "/enable");
}

export function disableAPerson(userId: string) {
  return axios.post(devAPIServer + "/People/" + userId + "/disable");
}
