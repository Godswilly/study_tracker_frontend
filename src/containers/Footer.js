import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import home from '../assets/images/home.png';
import progress from '../assets/images/progress.png';
import studyImg from '../assets/images/add-study.png';
import trackIt from '../assets/images/track-it.png';
import '../assets/index.css';

const FooterWrap = styled.footer`
  height: 100px;
  width: 100%;
  background-color: #808080;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  text-align: center;
  // margin-top: 90px;
  @media(max-width: 768px) {
    margin-top: -10px;
  }
`;

const ImgSize = styled.img`
  height: 40px;
  width: 40px;
`;
const Footer = () => (

  <FooterWrap>
    <Link
      to="/studies"
      role="button"
    >
      <ImgSize src={studyImg} alt="addstudy" />
      <p>Add Study</p>
    </Link>
    <Link
      to="/allStudies"
      role="button"
    >
      <ImgSize src={trackIt} alt="trackit" />
      <p>Track.it</p>
    </Link>
    <Link
      to="/levels/progress"
      role="button"
    >
      <ImgSize src={progress} alt="progress" />
      <p>Your progress</p>
    </Link>
    <Link
      to="/"
      role="button"
    >
      <ImgSize src={home} alt="home" />
      <p>Home</p>
    </Link>
  </FooterWrap>
);

export default Footer;
