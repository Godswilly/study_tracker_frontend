import study from '../../reducers/study';

describe('study reducer', () => {
  const initialState = {
    study: [],
    loading: false,
  };
  test('should return the initial state', () => {
    expect(study(undefined, {})).toEqual(initialState);
  });
});
