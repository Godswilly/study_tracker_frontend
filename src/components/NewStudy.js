import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStudy, checkLogin, submitNew } from '../actions/index';
import Footer from '../containers/Footer';

const NewStudy = ({
  study, createStudy, status, user, checkLogin,
}) => {
  const history = useHistory();

  useEffect(() => {
    checkLogin(status, user, history);
  }, []);

  const createDataChange = useCallback(e => {
    createStudy(e.target.name, e.target.value);
  }, [createStudy]);

  const handleSubmit = e => {
    e.preventDefault();
    submitNew(history, study);
  };

  return (
    <div>
      <div className="row mx-0">
        <div className="w-100 px-0">
          <div className="header-title">
            Add study
          </div>
          <form className="add-study px-5 pt-5 py-10" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="w-100" htmlFor="studyName">
                Study name
                <input
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
            <button type="submit" className="btn mt-3 custom-button">
              Create Study
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};