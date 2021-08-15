import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addStudies } from '../actions/index';
import Footer from '../containers/Footer';

const AddWrap = styled.div`
  height:475px;
  width: 100%;
  background-color: #42a9cf;

  @media (max-width: 768px) {
    height:450px;
    width: 100%;
    margin-left: 0;
  }
`;

const FormWrap = styled.form`
  width: 100%;
  height: 300px;
  margin-top: 50px;

  @media(max-width: 768px) {
    width: 100%;
  }
`;

const HoursInp = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0;

  &:focus {
    color: blue;
  }

  @media(max-width: 768px) {
    width: 140%;
  }
`;
const GoalInp = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0;

  &:focus {
    color: blue;
  }

  @media(max-width: 768px) {
    width: 140%;
  }
`;

const SubmitData = styled.button`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #14285c;
  color: white;
  border: none;

  &:hover {
    cursor: pointer;
  }

  @media(max-width: 768px) {
    width: 140%;
  }
`;

const TrackStudy = styled.div`
  color: white;
  font-weight: 500;
  font-size: 23px;
  text-align: center;
`;

const CenterW = styled.div`
  width: 50%;
  margin-left: 25%;

  @media(max-width: 768px) {
    display: flex;
    margin-left: 15%;
  }
`;
const NewStudy = ({ addStudies }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    hours: '',
    goal: '',
  });
  const {
    hours, goal,
  } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!(localStorage.token)) {
      history.push('/login');
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    addStudies({
      hours,
      goal,
    });
    history.push('/allStudies');
  };

  return (
    <>
      <AddWrap>
        <TrackStudy>
          Add Study
        </TrackStudy>
        <CenterW>

          <FormWrap onSubmit={onSubmit}>
            <HoursInp
              type="number"
              name="hours"
              value={hours}
              onChange={onChange}
              placeholder="Hours"
              required
            />
            <GoalInp
              type="number"
              name="goal"
              placeholder="Hours Target"
              value={goal}
              onChange={onChange}
              required
            />
            <SubmitData type="submit" onSubmit={onSubmit}>
              Add new Study
            </SubmitData>
          </FormWrap>
        </CenterW>
      </AddWrap>
      <Footer />
    </>
  );
};

NewStudy.propTypes = {
  addStudies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  study: state.study.study,
});

const mapDispatchToProps = (dispatch) => ({
  addStudies: (e) => dispatch(addStudies(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewStudy);
