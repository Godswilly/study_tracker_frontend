import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrap = styled.header`
  width: 100%;
  height: 100px;
  background-color: #51adcf;
`;

const Hstyle = styled.h2`
  text-align: center;
`;

const Header = () => (
  <HeaderWrap>
    <Hstyle>
      <Link to="/">
        Track.it
      </Link>
    </Hstyle>
  </HeaderWrap>
);

export default Header;
