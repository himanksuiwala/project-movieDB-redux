import React, { useEffect, useState } from "react";
import "./Navbar.css";
import styled from "styled-components";
export default function Navbar() {
  return (
    <Nav>
      <h2>MovieDB</h2>
    </Nav>
  );
}

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 30px;
  overflow-x: hidden;
  color: white;
`;
