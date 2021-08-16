import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';
import { progressCal } from '../actions/index';
import Footer from './Footer';

const DataContent = styled.div`
  display: flex;
  background-color: #51adcf;
  margin-bottom: 0px;

  @media(max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const DataRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 150px;
  margin-left: 20%;

  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-left: 35%;
    gap: 10px;
  }
`;

const Progress = ({ progressCal, calculations }) => {
  const history = useHistory();
  const result = (hours, goal) => {
    if (goal === 0) {
      return 100;
    }
    const percentage = (hours / goal) * 100;
    return percentage >= 100 ? 100 : Math.round(percentage);
  };

  useEffect(() => {
    if (!(localStorage.token)) {
      history.push('/login');
    }
    progressCal();
  }, [progressCal]);

  const progList = calculations.map((study) => (
    <div key={study.id}>
      <PieChart
        className="cSize"
        data={[{
          value: 1, color: '#1F3C88', key: `${result(study.hours, study.goal)} %`,
        }]}
        reveal={result(study.hours, study.goal)}
        lineWidth={20}
        animate
        label={({ dataEntry }) => dataEntry.key}
      />
    </div>
  ));

  const noProgress = () => (
    <h1>Sorry, No progress</h1>
  );

  return calculations ? (
    <>
      <DataContent>
        <DataRow>
          {calculations.length > 0 ? progList : noProgress}
        </DataRow>
      </DataContent>
      <Footer />
    </>
  )
    : (
      <>
        <Footer />
      </>
    );
};

Progress.propTypes = {
  calculations: PropTypes.instanceOf(Array).isRequired,
  progressCal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  calculations: state.studies.studies,
});

export default connect(mapStateToProps, { progressCal })(Progress);
