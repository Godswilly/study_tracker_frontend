import axios from 'axios';
import * as types from '../constants/actionTypes';

export const login = () => ({
  type: types.LOGIN,
});

export const updateData = (name, data) => ({
  type: types.UPDATE_DATA,
  name,
  data,
});

export const passStudies = (data) => ({
  type: types.PASS_STUDIES,
  data,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const resetData = () => ({
  type: types.LOGOUT,
});

export const createStudy = (name, data) => ({
  type: types.CREATE_STUDY,
  name,
  data,
});

export const passProgress = (data) => ({
  type: types.PASS_PROGRESS,
  data,
});

export const handleLogout = () => (dispatch) => {
  axios.delete('http://localhost:3001/api/v1/logout', { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then(() => {
      dispatch(logout());
      dispatch(resetData());
    });
};

export const handleLoginStatus = (status) => (dispatch) => {
  axios.get('http://localhost:3001/api/v1/logged_in', { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then((response) => {
      if (response.data.logged_in && status === 'NOT_LOGGED_IN') {
        dispatch(login());
        dispatch(updateData('email', response.data.user.email));
      } else if (!response.data.logged_in && status === 'LOGGED_IN') {
        dispatch(logout());
        dispatch(resetData());
      }
    });
};

export const submitSignup = (history, user) => (dispatch) => {
  axios.post('http://localhost:3001/api/v1/registrations',
    {
      user:
      {
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.passwordConfirmation,
      },
    },
    { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }).then((response) => {
    if (response.data.status === 'created') {
      dispatch(login());
      dispatch(updateData('userId', response.data.user.id));
      history.push('/');
    } else {
      dispatch(updateData('registrationErrors', response.data.errors.join('; ')));
    }
  });
};

export const submitLogin = (history, user) => (dispatch) => {
  axios.post('http://localhost:3001/api/v1/sessions', { user },
    { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }).then((response) => {
    if (response.data.logged_in) {
      dispatch(login());
      dispatch(updateData('userId', response.data.user.id));
      history.push('/');
    } else {
      dispatch(updateData('loginErrors', 'Wrong e-mail or password'));
    }
  });
};

export const checkLogin = (status, user, history) => (dispatch) => {
  if (status === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  dispatch(createStudy('userId', user.userId));
};

export const submitNew = (history, study) => {
  axios.post('http://localhost:3001/api/v1/studies/create', {
    study: {
      name: study.name,
      hours: study.hours,
      hours_goal: study.hoursGoal,
      projects: study.projects,
      projects_goal: study.projectsGoal,
      user_id: study.userId,
    },
  },
  { withCredentials: true },
  {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  }).then((response) => {
    if (response.data.status === 'created') {
      history.push(`/study/${response.data.study.id}`);
    }
  });
};

export const submitEdit = (history, study, id) => {
  axios.put(`http://localhost:3001/api/v1/update/${id}`, {
    study: {
      name: study.name,
      hours: study.hours,
      hours_goal: study.hoursGoal,
      projects: study.projects,
      projects_goal: study.projectsGoal,
      user_id: study.userId,
    },
  },
  { withCredentials: true },
  {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  }).then((response) => {
    if (response.data.status === 'created') {
      history.push(`/study/${id}`);
    }
  });
};

export const deleteStudy = (id, history) => {
  axios.delete(`http://localhost:3001/api/v1/destroy/${id}`, { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        history.push('/studies');
      }
    });
};

export const fetchStudy = (status, history, id) => (dispatch) => {
  if (status === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  axios.get(`http://localhost:3001/api/v1/show/${id}`, { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(createStudy('name', response.data.name));
        dispatch(createStudy('hours', response.data.hours));
        dispatch(createStudy('hoursGoal', response.data.hours_goal));
        dispatch(createStudy('projects', response.data.projects));
        dispatch(createStudy('projectsGoal', response.data.projects_goal));
      }
    });
};

export const fetchStudies = (status, history) => (dispatch) => {
  if (status === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  axios.get('http://localhost:3001/api/v1/studies/index', { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(passStudies(response.data));
      }
    });
};

export const fetchProgress = (status, history) => (dispatch) => {
  if (status === 'NOT_LOGGED_IN') {
    history.push('/');
  }
  axios.get('http://localhost:3001/api/v1/studies/progress', { withCredentials: true },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then((response) => {
      if (response.statusText === 'OK') {
        dispatch(passProgress(response.data.progress));
      }
    });
};
