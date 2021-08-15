const initialState = {
  loggedIn: false,
  user: {},
  error: '',
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        loggedIn: true,
      };
    case 'SET_USER':
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        error: '',
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        loggedIn: false,
        user: {},
        error: action.payload.error,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
}
