import * as types from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PASS_STUDIES:
      return [...action.data];
    default:
      return state;
  }
};
