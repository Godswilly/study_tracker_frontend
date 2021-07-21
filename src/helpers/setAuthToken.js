import axios from 'axios';

const setAuthToken = (token) => {
  // eslint-disable-next-line no-unused-expressions
  token ? axios.defaults.headers.common.Authorization = `Bearer ${token}`
    : delete axios.defaults.headers.common.Authorizations;
};

export default setAuthToken;
