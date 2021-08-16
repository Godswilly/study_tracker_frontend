/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';
import Footer from '../containers/Footer';
import { getStudy, deleteStudy } from '../actions/index';

const MainWrap = styled.div`
  width: 100%;
  height: 471px;
  background-color: #42a9cf;
`;

const LoadingWrap = styled.div`
  height: 450px;
  width: 100%;
`;

const DeleteB = styled.button`
  color: white;
  background-color: blue;
  width: 150px;
  border: none;
  &:hover {
    opacity: .6;
  }
`;

const DFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 10px;
  margin-left: 25%;

  @media(max-width: 768px) {
    margin-left: 0;
    width:100%;
  }
`;

const TextA = styled.p`
  text-align: center;
`;

const ChartPos = styled.div`
  margin-left: 260px;
  @media(max-width: 768px) {
    margin-left: 35%;
  }
`;

const LinkPos = styled.div`
  margin-left: 160px;
  @media(max-width: 768px) {
    margin-left: 20%;
  }
`;

const Study = ({
  getStudy, studies, match, deleteStudy, history,
}) => {
  const { id } = match.params;
  useEffect(() => {
    if (!(localStorage.token)) {
      history.push('/login');
    }
    getStudy(id);
  }, [getStudy, id]);

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

  return studies ? (
    <>
      <MainWrap>
        <TextA>Study Data</TextA>
        <DFlex>
          <ChartPos>
            <PieChart
              className="cSize"
              data={[{
                value: 1, color: '#1F3C88', key: `${result(studies.hours, studies.hours_goal)} %`,
              }]}
              reveal={result(studies.hours, studies.hours_goal)}
              lineWidth={20}
              animate
              label={({ dataEntry }) => dataEntry.key}
              labelStyle={{ fontSize: '1.6rem' }}
            />
          </ChartPos>
          <LinkPos>
            <Link to="/studies">
              Back to Study
            </Link>
            <Link
              className="edit"
              to={`/studies/${id}`}
              role="button"
            >
              Edit Study
            </Link>
            <DeleteB onClick={handleDelete} type="button">
              Delete Study
            </DeleteB>
          </LinkPos>
        </DFlex>
      </MainWrap>
      <Footer />
    </>
  ) : (
    <LoadingWrap>
      <h1>Loading........</h1>
    </LoadingWrap>
  );
};

Study.propTypes = {
  getStudy: PropTypes.func.isRequired,
  deleteStudy: PropTypes.func.isRequired,
  studies: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (state) => ({
  studies: state.studies,
});

export default connect(mapStateToProps, { getStudy, deleteStudy })(withRouter(Study));
