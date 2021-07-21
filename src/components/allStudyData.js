import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';
import { getStudies } from '../actions/index';
import Footer from '../containers/Footer';

const H4 = styled.h4`
  height: 550px;
  color: white;

  @media(max-width: 768px) {
    height: 450px;
  }
`;

const P = styled.p`
  position: absolute;
  left: 35%;

  @media(max-width: 768px) {
    left: 10%;
  }
`;

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

const AllStudy = ({ getStudies, studies }) => {
  const result = (hours, goal) => {
    if (hours + hours === goal) {
      return 100;
    }
    const percentage = ((hours) / (goal)) * 100;
    return percentage >= 100 ? 100 : Math.round(percentage);
  };

  useEffect(() => {
    getStudies();
  }, [getStudies]);

  const allStudies = studies.studies.map((study) => (
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
      <h5>
        Study Hours:
        {study.hours}
        hrs
      </h5>
      <h5>
        Study Hours Target:
        {study.goal}
        hrs
      </h5>
    </div>
  ));

  const noStudyData = (
    <H4>
      <P>No study data yet? Kindly create one</P>
    </H4>
  );

  return studies.studies ? (
    <>
      <DataContent>
        <DataRow>
          {studies.studies.length > 0 ? allStudies : noStudyData}
        </DataRow>
      </DataContent>
      <Footer />
    </>
  ) : <h2>Loading........</h2>;
};

AllStudy.propTypes = {
  getStudies: PropTypes.func.isRequired,
  studies: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (state) => ({
  studies: state.studies,
});

export default connect(mapStateToProps, { getStudies })(AllStudy);
