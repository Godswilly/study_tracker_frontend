import status from '../../reducers/status';
import * as types from '../../constants/actionTypes';

describe('status reducer', () => {
  const initialState = 'NOT_LOGGED_IN';
  test('should return the initial state', () => {
    expect(status(undefined, {})).toEqual(initialState);
  });

  test('should handle LOGIN', () => {
    expect(
      status('', {
        type: types.LOGIN,
      }),
    ).toEqual('LOGGED_IN');

    expect(
      status(
        initialState,
        {
          type: types.LOGIN,
        },
      ),
    ).toEqual('LOGGED_IN');
  });

  test('should handle LOGOUT', () => {
    expect(
      status('LOGGED_IN', {
        type: types.LOGOUT,
      }),
    ).toEqual(initialState);
  });
});
