import axios from "axios";

export const fetchMasses = () => axios.get("/api/thanksgiving/masses");

export const submitThanksgiving = (data) =>
  axios.post("/api/thanksgiving", data);
