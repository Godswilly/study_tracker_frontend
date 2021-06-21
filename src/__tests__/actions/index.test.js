import {
  updateData, resetData, login, logout, passStudies, passProgress, createStudy,
} from '../../actions/index';
import * as types from '../../constants/actionTypes';

describe('actions', () => {
  test('should trigger an action to update User data', () => {
    const name = 'email';
    const data = 'kalu@gmail.com';
    const expectedAction = {
      type: types.UPDATE_DATA,
      name,
      data,
    };
    expect(updateData(name, data)).toEqual(expectedAction);
  });

  test('should trigger an action to reset User data', () => {
    const expectedAction = {
      type: types.LOGOUT,
    };
    expect(resetData()).toEqual(expectedAction);
  });

  test('should trigger an action to login', () => {
    const expectedAction = {
      type: types.LOGIN,
    };
    expect(login()).toEqual(expectedAction);
  });

  test('should trigger an action to logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
    };
    expect(logout()).toEqual(expectedAction);
  });

  test('should trigger an action to pass Studies', () => {
    const data = [];
    const expectedAction = {
      type: types.PASS_STUDIES,
      data,
    };
    expect(passStudies(data)).toEqual(expectedAction);
  });

  test('should trigger an action to pass Progress', () => {
    const data = [];
    const expectedAction = {
      type: types.PASS_PROGRESS,
      data,
    };
    expect(passProgress(data)).toEqual(expectedAction);
  });

  test('should trigger an action to create study', () => {
    const name = 'hours';
    const data = 10;
    const expectedAction = {
      type: types.CREATE_STUDY,
      name,
      data,
    };
    expect(createStudy(name, data)).toEqual(expectedAction);
  });
});
