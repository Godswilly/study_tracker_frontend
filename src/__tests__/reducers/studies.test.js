import studies from '../../reducers/studies';

describe('studies reducer', () => {
  const initialState = {
    studies: [],
    loading: false,
  };
  test('should return the initial state', () => {
    expect(studies(undefined, {})).toEqual(initialState);
  });
});
