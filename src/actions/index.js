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
