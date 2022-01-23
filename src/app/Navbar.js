import React, { useEffect, useState } from "react";
import '../public/Navbar.css'
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <Nav>
      <Link to={"/"}>
        <h2>MovieDB</h2>
      </Link>
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
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  a,
  a:hover,
  a:active,
  a:visited {
    color: white;
    text-decoration: none;
  }
`;
