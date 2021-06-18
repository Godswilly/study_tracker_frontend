import React, { useCallback, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkLogin, submitEdit, createStudy } from '../actions/index';
import Footer from '../containers/Footer';
import '../assets/index.css';

const EditStudy = ({
  study, createStudy, status, user, match, checkLogin,
}) => {
  const history = useHistory();
  const { id } = match.params;

  useEffect(() => {
    checkLogin(status, user, history, createStudy);
  }, []);

  const createDataChange = useCallback((e) => {
    createStudy(e.target.name, e.target.value);
  }, [createStudy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEdit(history, id, study);
  };

  return (
    <div>
      <div className="row mx-0">
        <div className="w-100 px-0">
          <div className="header-title">
            Edit
          </div>
          <form className="add-study px-5 pt-5 py-10 mb-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="w-100" htmlFor="studyName">
                Study name
                <input
                  defaultValue={study.name}
                  type="text"
                  name="name"
                  id="studyName"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="studyHours">
                Hours completed
                <input
                  type="number"
                  name="hours"
                  id="studyHours"
                  defaultValue={study.hours}
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Hours completed"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="studyHoursGoal">
                Hours goal
                <input
                  type="number"
                  name="hoursGoal"
                  id="studyHoursGoal"
                  defaultValue={study.hoursGoal}
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Hours goal"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="studyProjects">
                Projects completed
                <input
                  type="number"
                  name="projects"
                  id="studyProjects"
                  defaultValue={study.projects}
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Projects completed"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100" htmlFor="studyProjectsGoal">
                Projects goal
                <input
                  type="number"
                  name="projectsGoal"
                  id="studyProjectsGoal"
                  defaultValue={study.projectsGoal}
                  pattern="[0-9]+([\.,][0-9]+)?"
                  step="0.01"
                  inputMode="numeric"
                  className="form-control"
                  placeholder="Projects goal"
                  required
                  onChange={createDataChange}
                />
              </label>
            </div>
            <div>
              <h4 className="red-error">{study.createErrors}</h4>
            </div>
            <button type="submit" className="d-block btn mt-3 custom-button mb-3">
              Save Changes
            </button>
            <Link to={`/study/${id}`} className="btn btn-lg custom-button">
              Back to study
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

EditStudy.propTypes = {
  study: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hours: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    hoursGoal: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    projects: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    projectsGoal: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    createErrors: PropTypes.string.isRequired,
  }).isRequired,
  createStudy: PropTypes.func.isRequired,
  checkLogin: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  study: state.study,
  status: state.status,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  createStudy: (name, data) => dispatch(createStudy(name, data)),
  checkLogin: (status, user, history) => dispatch(checkLogin(status, user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStudy);
