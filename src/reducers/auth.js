const initialState = {
  loggedIn: false,
  user: {},
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER':
      return {
        loggedIn: true,
        user: { ...payload.user },
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
}
