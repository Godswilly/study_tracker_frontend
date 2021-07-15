import { PROGRESS_CALCULATION } from '../constants/actionTypes';

const initialState = {
  calculations: {},
  loading: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROGRESS_CALCULATION:
      return {
        ...state,
        calculations: payload,
        loading: false,
      };
    default:
      return state;
  }
}
