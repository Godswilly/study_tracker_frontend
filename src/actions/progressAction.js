import axios from 'axios';
import { PROGRESS_CALCULATION, STUDIES_ERRORS } from '../constants/actionTypes';

const defaultURL = 'http://localhost:3001/api/v1'; // development

// const defaultURL = 'https://pure-stream-80472.herokuapp.com'; // production

const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};
// eslint-disable-next-line consistent-return
const progressCal = () => async (dispatch) => {
  try {
    const response = await axios.get(`${defaultURL}/levels/progress`, apiConfig);
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

export default progressCal;
