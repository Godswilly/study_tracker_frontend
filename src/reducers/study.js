import { GET_STUDY, ADD_STUDY } from '../constants/actionTypes';

const initialState = {
  study: [],
  loading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STUDY:
      return {
        ...state,
        study: action.payload,
        loading: false,
      };
    case ADD_STUDY:
      return {
        ...state,
        study: [action.payload, ...state.study || {}],
        loading: false,
      };
    default:
      return state;
  }
}
