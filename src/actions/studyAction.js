// eslint-disable import/prefer-default-export no-unused-vars
import axios from 'axios';
import {
  GET_STUDIES, GET_STUDY, DELETE_STUDY, ADD_STUDY, UPDATE_STUDY,
  STUDIES_ERRORS,
} from '../constants/actionTypes';

const defaultURL = 'http://localhost:3000/api/v1'; // development
// const defaultURL = 'https://pure-stream-80472.herokuapp.com'; // production

const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
// eslint-disable-next-line consistent-return
const addStudies = (studyData) => async (dispatch) => {
  const apiConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    const study = await axios.post(`${defaultURL}/studies`, studyData, apiConfig);

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
    },
  };
  try {
    const study = await axios.get(`${defaultURL}/studies/${id}`, apiConfig);
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
    },
  };
  try {
    const allStudies = await axios.get(`${defaultURL}/allStudies`, apiConfig);

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
    },
    body: JSON.stringify(study),
  };
  try {
    const edit = await axios.put(`${defaultURL}/studies/${id}`, study, apiConfig);
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
    },
  };
  try {
    const remove = await axios.delete(`${defaultURL}/studies/${id}`, apiConfig);
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
  addStudies, getStudy, getStudies, updateStudy, deleteStudy,
};
