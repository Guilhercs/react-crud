import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3000",
});

const onSuccess = (config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
    };
  }
  return config;
};

const onError = (err) => {
  return Promise.reject(err);
};

http.interceptors.request.use(onSuccess, onError);
