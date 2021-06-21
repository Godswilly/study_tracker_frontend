import study from '../../reducers/study';
import * as types from '../../constants/actionTypes';

describe('study reducer', () => {
  const initialState = {
    name: '', hours: 0, hoursGoal: 0, projects: 0, projectsGoal: 0, createErrors: '', userId: 0,
  };
  test('should return the initial state', () => {
    expect(study(undefined, {})).toEqual(initialState);
  });

  test('should handle CREATE_STUDY', () => {
    expect(
      study({}, {
        type: types.CREATE_STUDY,
        name: 'hours',
        data: 5,
      }),
    ).toEqual({ hours: 5 });

    expect(
      study(
        initialState,
        {
          type: types.CREATE_STUDY,
          name: 'hours',
          data: 5,
        },
      ),
    ).toEqual({ ...initialState, hours: 5 });
  });
});
