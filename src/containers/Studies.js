import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';
import { fetchStudies } from '../actions/index';
import Footer from './Footer';
import '../assets/index.css';

const Studies = ({ studies, fetchStudies, status }) => {
  const history = useHistory();

  const result = (hours, hoursGoal, projects, projectsGoal) => {
    if (hoursGoal + projectsGoal === 0) {
      return 100;
    }
    const percentage = ((hours + projects) / (hoursGoal + projectsGoal)) * 100;
    return percentage >= 100 ? 100 : Math.round(percentage);
  };

  useEffect(() => {
    fetchStudies(status, history);
  }, []);

  const allStudies = studies.map((study) => (
    <div key={study.id} className="p-0">
      <div className="card mb-5 each-study">
        <div className="card-body d-flex justify-content-between align-items-center">
          <PieChart
            data={[{
              value: 1, color: '#8ce08a', key: `${result(study.hours, study.hours_goal, study.projects, study.projects_goal)} %`,
            }]}
            reveal={result(study.hours, study.hours_goal, study.projects, study.projects_goal)}
            lineWidth={20}
            animate
            className="pie-chart"
            label={({ dataEntry }) => dataEntry.key}
            labelStyle={{ fontSize: '1.4rem' }}
          />
          <h5 className="card-title m-0">{study.name}</h5>
          <Link
            to={{
              pathname: `/study/${study.id}`,
              state:
                       {
                         name: study.name,
                         hours: study.hours,
                         hoursGoal: study.hours_goal,
                         projects: study.projects,
                         projectsGoal: study.projects_goal,
                       },
            }}
            className="btn custom-button"
          >
            View Study
          </Link>
        </div>
      </div>
    </div>
  ));

  const noStudy = (
    <div className="d-flex align-items-center justify-content-center">
      <h4>
        No studies yet? Why not create one.
      </h4>
    </div>
  );

  return (
    <>
      <div className="header-title">
        Track.it
      </div>
      <div className="py-10">
        <main className="container p-0">
          <div className="m-0">
            {studies.length > 0 ? allStudies : noStudy}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};


Studies.propTypes = {
  fetchStudies: PropTypes.func.isRequired,
  studies: PropTypes.instanceOf(Array).isRequired,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  studies: state.studies,
  status: state.status,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStudies: (status, history) => dispatch(fetchStudies(status, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Studies);
