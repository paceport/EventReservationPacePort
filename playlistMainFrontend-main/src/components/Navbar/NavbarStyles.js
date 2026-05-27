import styled from "styled-components";

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: calc(100% - 4rem);
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  z-index: 10;
  padding: 0 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c1c1;

  @media screen and (min-width: 468px) and (max-width: 768px) {
    width: 100%;
    left: 0;
    height: auto;
    flex-direction: column;
    justify-content: center;
  }
`;

export const NavRightContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-left: auto;
  height: 100%;
  flex-grow: 1;

  h2 {
    margin: 0;
    font-size: 23px;
    font-weight: bolder;
    letter-spacing: 0.61px;
    white-space: nowrap;
  }

  @media screen and (max-width: 468px) {
    justify-content: center;
    margin-left: 0;
  }
`;

export const NavLeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // Aligns items to the left
  padding-right: 10px;
  height: 100%;
  flex-grow: 1; // Allows it to grow as needed

  @media screen and (max-width: 468px) {
    justify-content: center;
    padding-right: 0;
  }
`;

export const NavbarIcon = styled.i`
  display: flex;
  gap: 25px;
  color: #4a89dc;
  align-items: center;

  svg {
    font-size: 35px;
  }

  @media screen and (max-width: 468px) {
    font-size: 25px; // Adjusted for smaller screens
    gap: 15px; // Reduced gap for smaller screens
  }
`;


