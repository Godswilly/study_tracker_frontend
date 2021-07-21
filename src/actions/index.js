// eslint-disable import/prefer-default-export no-unused-vars
import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import {
  AUTH_FAIL, PROGRESS_CALCULATION,
  GET_STUDIES, GET_STUDY, DELETE_STUDY, ADD_STUDY, UPDATE_STUDY,
  STUDIES_ERRORS,
} from '../constants/actionTypes';

const defaultUrl = 'http://localhost:3001/api/v1'; // development
// const defaultUrl = 'https://pure-stream-80472.herokuapp.com/api/v1'; // production

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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
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

const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
};

// eslint-disable-next-line consistent-return
const progressCal = () => async (dispatch) => {
  try {
    const response = await axios.get(`${defaultUrl}/levels/progress`, apiConfig);
    dispatch({
      type: PROGRESS_CALCULATION,
      payload: response.data.progress,
    });
    return response;
  } catch (error) {
    dispatch({
      type: STUDIES_ERRORS,
      payload: error,
    });
  }
};

const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
// eslint-disable-next-line consistent-return
const addStudies = (studyData) => async (dispatch) => {
  const apiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  };

  try {
    const study = await axios.post(`${defaultUrl}/studies`, studyData, apiConfig);

    myLibrary.push(study.data);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    dispatch({
      type: ADD_STUDY,
      payload: study.data,
    });
    return study.data;
  } catch (error) {
    dispatch({
      type: STUDIES_ERRORS,
      payload: error,
    });
  }
};
// eslint-disable-next-line consistent-return
const getStudy = (id) => async (dispatch) => { // index page
  const apiConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  };
  try {
    const study = await axios.get(`${defaultUrl}/studies/${id}`, apiConfig);
    dispatch({
      type: GET_STUDY,
      payload: study.data,
    });
    return study.data;
  } catch (error) {
    dispatch({
      type: STUDIES_ERRORS,
      payload: error,
    });
  }
};
// eslint-disable-next-line consistent-return
const getStudies = () => async (dispatch) => {
  const apiConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  };
  try {
    const allStudies = await axios.get(`${defaultUrl}/allStudies`, apiConfig);

    dispatch({
      type: GET_STUDIES,
      payload: allStudies.data,
    });
    return allStudies.data;
  } catch (error) {
    dispatch({
      type: STUDIES_ERRORS,
      payload: error,
    });
  }
};
// eslint-disable-next-line consistent-return
const updateStudy = (id, study) => async (dispatch) => {
  const apiConfig = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(study),
  };
  try {
    const edit = await axios.put(`${defaultUrl}/studies/${id}`, study, apiConfig);
    dispatch({
      type: UPDATE_STUDY,
      payload: edit.data,
    });
    return edit.data;
  } catch (error) {
    dispatch({
      type: STUDIES_ERRORS,
      payload: error,
    });
  }
};
// eslint-disable-next-line consistent-return
const deleteStudy = (id) => async (dispatch) => {
  const apiConfig = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  };
  try {
    const remove = await axios.delete(`${defaultUrl}/studies/${id}`, apiConfig);
    myLibrary.splice(remove, 1);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    dispatch({
      type: DELETE_STUDY,
      payload: remove.data,
    });
    return remove.data;
  } catch (error) {
    dispatch({
      type: STUDIES_ERRORS,
      payload: error,
    });
  }
};

export {
  addStudies, getStudy, getStudies, updateStudy, deleteStudy, loadUser, progressCal,
};
