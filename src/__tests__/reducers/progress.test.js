import progress from '../../reducers/progressCalculations';

describe('progress reducer', () => {
  const initialState = {
    calculations: {},
    loading: false,
  };
  test('should return the initial state', () => {
    expect(progress(undefined, {})).toEqual(initialState);
  });
});
