import studies from '../../reducers/studies';
import * as types from '../../constants/actionTypes';

describe('studies reducer', () => {
  const initialState = [];
  test('should return the initial state', () => {
    expect(studies(undefined, {})).toEqual(initialState);
  });

  test('should handle PASS_STUDIES', () => {
    expect(
      studies({}, {
        type: types.PASS_STUDIES,
        data: [{
          name: 'Novel', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
        }],
      }),
    ).toEqual([{
      name: 'Novel', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
    }]);

    expect(
      studies(
        initialState,
        {
          type: types.PASS_STUDIES,
          data: [{
            name: 'Novel', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
          }],
        },
      ),
    ).toEqual([...initialState, {
      name: 'Novel', hours: 5, hoursGoal: 5, projects: 5, projectsGoal: 5,
    }]);
  });
});
