import styled, { css } from "styled-components";

export const ItemName = styled.span`
  margin-left: 0.5rem;
  display: none;
`;

const hoverStyles = css`
  width: 11rem;

  ${ItemName} {
    display: block;
  }
`;

export const Children = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 4rem;

  @media (max-width: 468px) {
    margin-left: 5rem;
    height: 100%;
  }
  @media only screen and (min-width: 468px) and (max-width: 768px) {
    margin-left: 5rem;
    height: 100vh;
  }
`;

export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const SidebarLogoWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 468px) {
    justify-content: center;
  }
`;

export const SidebarLogo = styled.a`
  display: flex;
  margin-top: 25px;

  @media (max-width: 468px) {
    display: none;
  }
`;

// SidebarItem styles
export const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 5px;
`;

export const ItemContainer = styled.li`
  margin-top: 0.8rem;
  /* margin-left: 0.4rem; */
  border-radius: 0.2rem;
  display: flex;
  /* padding: 10px; */
  flex-direction: column;
  justify-content: center;
  align-self: center;
  cursor: pointer;

  &:hover {
    background-color: #0d509f;
    color: black;
  }

  &.active {
    background-color: #0d509f;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  margin-left: 0.4rem;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  color: white;
`;

export const SidebarContainer = styled.div`
  position: fixed;
  z-index: 20;
  left: 0;
  width: 4rem;
  height: 100vh;
  /* padding: 0.75rem;   */
  background: #4e84c4;
  transition: width 350ms ease;
  border-right: 1px solid #d4d8dd;
  overflow-x: hidden;

  &:hover {
    ${hoverStyles}
  }

  @media (max-width: 468px) {
    width: 5rem;
  }
`;


