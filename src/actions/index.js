import axios from 'axios';
import * as types from '../constants/actionTypes';

export const login = () => ({
  type: types.LOGIN,
});

export const updateData = (name, data) => ({
  type: types.UPDATE_DATA,
  name,
  data,
});

export const passStudy = (data) => ({
  type: types.PASS_STUDIES,
  data,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const resetData = () => ({
  type: types.LOGOUT,
});

export const createStudy = (name, data) => ({
  type: types.CREATE_STUDY,
  name,
  data,
});

export const passProgress = (data) => ({
  type: types.PASS_PROGRESS,
  data,
});

export const handleLogout = () => (dispatch) => {
  axios.delete('http://localhost/api/v1/logout', { withCredentials: true })
  .then(() => {
    dispatch(logout());
    dispatch(resetData());
  })
}

export const handleLoginStatus = (status) => (dispatch) => {
  axios.get('http://localhost/api/v1/logged_in', { withCredentials:true })
  .then(response => {
    if(response.data.logged_in && status === 'NOT_LOGGED_IN') {
      dispatch(login());
      dispatch(updateData('email', response.data.user.email));
    } else if (!response.data.logged_in && status === 'LOGGED_IN') {
        dispatch(logout());
        dispatch(resetData()); 
      }
  })
};
