import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/images/home.png';
import progress from '../assets/images/progress.png';
import studyImg from '../assets/images/add-study.png';
import trackIt from '../assets/images/track-it.png';

const Footer = () => (

  <footer className="footer mt-auto w-100 button-footer d-flex align-items-center">
    <Link
      to="/study"
      className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
      role="button"
    >
      <img className="footer-img" src={studyImg} alt="add-study" />
      <p className="mb-0">Add study</p>
    </Link>
    <Link
      to="/studies"
      className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
      role="button"
    >
      <img className="footer-img" src={trackIt} alt="add-study" />
      <p className="mb-0">Track.it</p>
    </Link>
    <Link
      to="/progress"
      className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
      role="button"
    >
      <img className="footer-img" src={progress} alt="add-study" />
      <p className="mb-0">Your progress</p>
    </Link>
    <Link
      to="/"
      className="btn btn-lg w-25 h-100 d-flex flex-column align-items-center py-1 px-0 justify-content-between footer-btn"
      role="button"
    >
      <img className="footer-img" src={home} alt="add-study" />
      <p className="mb-0">Home</p>
    </Link>
  </footer>
);

export default Footer;
