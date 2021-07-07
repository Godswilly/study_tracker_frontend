import axios from 'axios';

const setAuthToken = (token) => {
  token ? axios.defaults.headers.common.Authorization = `Bearer ${token}`
    : delete axios.defaults.headers.commone.Authorizations;
};

export default setAuthToken;
