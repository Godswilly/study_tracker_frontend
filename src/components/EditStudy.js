import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStudy, updateStudy } from '../actions/studyAction';

const EditStudy = ({
  getStudy, match, updateStudy, history, study,
}) => {
  const [formData, setFormData] = useState({
    hours: '',
    goal: '',
  });
  const {
    hours, goal,
  } = formData;

  const { id } = match.params;
  useEffect(() => {
    getStudy(id);
    setFormData({
      hours: !study.hours ? '' : study.hours,
      goal: !study.goal ? '' : study.goal,
    });
  }, [getStudy, id, study.hours, study.goal]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    updateStudy(id, {
      hours, goal,
    }, history);
  };

  return (
    <>
      <div>
        <div>
          Edit Study
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="hours">
              Hours
              <input
                type="number"
                name="hours"
                value={hours}
                onChange={onChange}
                placeholder="Hours"
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="HoursTarget">
              Target
              <input
                type="number"
                name="target"
                placeholder="Hours Target"
                required
                value={goal}
                onChange={onChange}
              />
            </label>
          </div>
          <button type="submit">
            Save changes
          </button>
          <Link to={`/study/${id}`}>
            Back to study
          </Link>
        </form>
      </div>
    </>
  );
};

EditStudy.propTypes = {
  getStudy: PropTypes.func.isRequired,
  study: PropTypes.instanceOf(Array).isRequired,
  updateStudy: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  study: state.study,
});

export default connect(mapStateToProps, { getStudy, updateStudy })(withRouter(EditStudy));
