import { GET_STUDIES, DELETE_STUDY, UPDATE_STUDY } from '../constants/actionTypes';

const initialState = {
  studies: [],
  loading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_STUDIES:
      return {
        ...state,
        studies: payload,
        loading: false,
      };
    case DELETE_STUDY:
      return {
        ...state,
        studies: state.studies.filter((study) => study !== payload),
      };
    case UPDATE_STUDY:
      return {
        ...state,
        studies: state.studies.map((study) => (study.id === payload.id ? payload : study)),
        loading: false,
      };
    default:
      return state;
  }
}
