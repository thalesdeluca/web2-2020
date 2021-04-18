import axios from 'axios';

const api = axios.create({
  baseURL: "https://web2-back.continuelab.com.br"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("@song-search");

  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})

export default api;