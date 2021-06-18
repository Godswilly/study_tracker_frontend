import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';
import { fetchStudy, deleteStudy } from '../actions/index';
import Footer from '../containers/Footer';
import projectsImg from '../assets/images/projects.png';
import hoursImg from '../assets/images/hours.png';

const Study = ({
  status, match, study, fetchStudy,
}) => {
  const { id } = match.params;
  const history = useHistory();

  const result = (hours, goal) => {
    if (goal === 0) {
      return 100;
    }
    const percentage = (hours / goal) * 100;
    return percentage >= 100 ? 100 : Math.round(percentage);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteStudy(id, history);
  };

  useEffect(() => {
    fetchStudy(status, history, id);
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <div className="header-title">
        {study.name}
      </div>
      <div>
        <div className="pie-chart-ctn d-flex justify-content-around align-items-center p-5">
          <div className="d-flex flex-column align-items-center justify-content-around">
            <PieChart
              data={[{
                value: 1, color: '#8ce08a', key: `${result(study.hours, study.hoursGoal)} %`,
              }]}
              reveal={result(study.hours, study.hoursGoal)}
              lineWidth={20}
              animate
              className="pie-chart"
              label={({ dataEntry }) => dataEntry.key}
              labelStyle={{ fontSize: '1.6rem' }}
            />
            <p className="mt-2">Hours</p>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-around">
            <PieChart
              data={[{
                value: 1, color: '#8ce08a', key: `${result(study.projects, study.projectsGoal)} %`,
              }]}
              reveal={result(study.projects, study.projectsGoal)}
              lineWidth={20}
              animate
              className="pie-chart"
              label={({ dataEntry }) => dataEntry.key}
              labelStyle={{ fontSize: '1.6rem' }}
            />
            <p className="mt-2">Projects</p>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div className="mt-3 d-flex justify-content-around align-items-center stats-ctn p-5">
              <img className="study-img" src={hoursImg} alt="hours" />
              <div className="text-center ml-1">
                {study.hours}
                {' '}
                /
                {study.hoursGoal}
                {' '}
                hours completed
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-around align-items-center stats-ctn p-5">
              <img className="study-img" src={projectsImg} alt="projects" />
              <div className="text-center ml-1">
                {study.projects}
                {' '}
                /
                {study.projectsGoal}
                {' '}
                projects completed
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center mt-3 py-10 study-buttons">
            <Link to="/studies" className="btn btn-lg custom-button mb-3">
              Back to studies
            </Link>
            <Link
              to={`/edit/${id}`}
              className="btn btn-lg custom-button mb-3"
              role="button"
            >
              Edit Study
            </Link>
            <button onClick={handleDelete} type="button" className="btn btn-lg custom-button delete-btn">
              Delete Study
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Study.propTypes = {
  status: PropTypes.string.isRequired,
  fetchStudy: PropTypes.func.isRequired,
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
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  study: state.study,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudy: (status, history, id) => dispatch(fetchStudy(status, history, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Study);
