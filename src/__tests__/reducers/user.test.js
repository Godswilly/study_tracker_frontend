import user from '../reducers/user';
import * as types from '../../constants/actionTypes';

describe('user reducer', () => {
  const initialState = {
    email: '', password: '', passwordConfirmation: '', registrationErrors: '', loginErrors: '', userId: 1,
  };
  test('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  test('should handle UPDATE_DATA', () => {
    expect(
      user({}, {
        type: types.UPDATE_DATA,
        name: 'email',
        data: 'kalu@gmail.com',
      }),
    ).toEqual({ email: 'kalu@gmail.com' });

    expect(
      user(
        initialState,
        {
          type: types.UPDATE_DATA,
          name: 'email',
          data: 'kalu@gmail.com',
        },
      ),
    ).toEqual({ ...initialState, email: 'kalu@gmail.com' });
  });

  test('should handle LOGOUT', () => {
    expect(
      user([{ email: 'kalu@gmail.com', password: '12345678' }], {
        type: types.LOGOUT,
      }),
    ).toEqual(initialState);

    expect(
      user({ ...initialState, email: 'kalu@gmail.com' },
        {
          type: types.LOGOUT,
        }),
    ).toEqual(initialState);
  });
});
