import styled from "styled-components";

export const Main = styled.div`
  margin: 0;
  padding: 0;
`;

export const ImageContainer = styled.image`
  margin-top: 100px;
  @media (max-width: 468px) {
    display: none;
  }
  @media only screen and (min-width: 468px) and (max-width: 868px) {
    display: none;
  }
`;
export const Heading = styled.h3`
  padding-top: 32px;
  z-index: 1;
  color: #ffffff;
  opacity: 1;
  font: normal normal 600 24px/41px Houschka Pro;
  text-align: left;
  margin-left: 50px;
  transform: translateY(100%);
  height: 30px;
`;

export const CategoryContainer = styled.div`
  list-style: none;
  display: inline-flex;
  gap: 20px;
  position: relative;
  margin-left: 50px;
  transform: translateY(-50%);
  top: 50%;

  @media (max-width: 468px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 0px;
    padding: 0px 50px 0 50px;
    margin-left: 50px;
    transform: translateY(0%);
  }

  @media only screen and (min-width: 468px) and (max-width: 868px) {
    display: grid;
    justify-content: space-around;
    height: 100%;
    width: 0px;
    margin-left: 90px;
    padding: 0px 50px 0px 50px;
    transform: translateY(0%);
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 100px 100px;
  }
`;

export const CategoryItems = styled.button`
  align-items: center;
  border-radius: 8px;
  width: 80px;
  height: 85px;
  background: #df653a 0% 0% no-repeat padding-box;
  box-shadow: 0px 6px 36px #00000052;
  &:hover {
  }

  @media (max-width: 468px) {
    padding: 10px 10px 10px 10px;
    font-size: 10px;
    height: 60px;
    width: 100px;
    gap: 10px;
  }

  @media only screen and (min-width: 468px) and (max-width: 868px) {
    padding: 20px;
    height: 70px;
    width: 100px;
    font-size: 20px;
  }
`;
export const DisabledCategoryItems = styled(CategoryItems)`
  pointer-events: none;
  opacity: 0.8;
`;

export const CategoryIcon = styled.i`
  align-items: center;
  padding: 3px 3px 3px 3px;
  float: center;
  @media (max-width: 468px) {
    display: none;
  }
  @media only screen and (min-width: 468px) and (max-width: 868px) {
    padding: 2px;
    align-items: center;
    float: center;
  }
`;
export const CategoryItemName = styled.span`
  font-weight: bold;
  font-size: 11px;
  letter-spacing: 0.3px;
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 5px;
  @media only screen and (min-width: 468px) and (max-width: 868px) {
    display: grid;
    padding: 2px;
    font-weight: bold;
    font-size: 10px;
  }
`;

export const Togglediv = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  justify-content: space-between;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 0 20px 0 20px;

  @media (max-width: 468px) {
    display: none;
  }

  @media only screen and (min-width: 468px) and (max-width: 868px) {
    padding-top: 100px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 50px 100px;
  }
`;

export const ToggleLeftContainer = styled.div`
  display: flex;
  color: black;
  align-items: center;
  gap: 20px;
  padding-bottom: 10px;
  h3 {
    padding: 10px 0px 0px 10px;
  }
`;

export const TableLabel = styled.span`
  padding-right: 12px;
  padding-top: 2px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

export const ListLabel = styled.span`
  padding-left: 12px;
  padding-top: 2px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

export const ToggleRightContainer = styled.div`
  padding-right: 50px;
  padding-bottom: 50px;
`;

export const ListSection = styled.div`
  display: flex;
  //padding: 20px;
  flex: 1;
  background-color: #f2f2f2;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 468px) {
    display: none;
  }
  @media only screen and (min-width: 468px) and (max-width: 868px) {
    display: none;
  }
`;


