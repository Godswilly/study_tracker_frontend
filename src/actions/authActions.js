import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import { AUTH_FAIL } from '../constants/actionTypes';

const defaultUrl = 'http://localhost:3001/api/v1'; // development
// const defaultUrl = 'https://pure-stream-80472.herokuapp.com'; //production

const setUser = (payload) => ({ type: 'SET_USER', payload });
// eslint-disable-next-line no-unused-vars
const loadUser = () => async (dispatch) => {
  if (localStorage.auth_token) {
    setAuthToken(localStorage.auth_token);
  }
};
// eslint-disable-next-line consistent-return
export const signup = (userDetails) => async (dispatch) => {
  const apiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(userDetails),
  };

  try {
    const data = await axios.post(`${defaultUrl}/signup`, userDetails, apiConfig);

    localStorage.setItem('token', data.data.auth_token.result);
    dispatch(setUser({ loggedIn: true, user: data.data.user }));
    return data.data;
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload: error,
    });
  }
};
// eslint-disable-next-line consistent-return
export const login = (userDetails) => async (dispatch) => {
  const apiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      // 'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(userDetails),
  };

  try {
    const data = await axios.post(`${defaultUrl}/auth/login`, userDetails, apiConfig);

    localStorage.setItem('token', data.data.auth_token);
    dispatch(setUser({ loggedIn: true, user: data.data.user }));
    return data.data;
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload: error,
    });
  }
};

export const logout = () => ({ type: 'LOGOUT' });

export default loadUser;
