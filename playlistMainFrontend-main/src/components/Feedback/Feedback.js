import styled from "styled-components";

export const Main = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
`;

export const ImageContainer = styled.image`
  margin: 0;
  padding: 0;
  @media (max-width: 468px) {
    display: none;
  }
  @media only screen and (min-width: 468px) and (max-width: 868px) {
    display: none;
  }
`;

export const Heading = styled.h3`
  z-index: 1;
  padding-top: 35px;
  color: #ffffff;
  opacity: 1;
  font: normal normal 600 24px/41px Houschka Pro;
  text-align: left;
  margin-left: 50px;
  transform: translateY(100%);
  height: 30px;
`;

export const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 20px 0px 20px;
  gap: 5px;
`;

export const HorizontalList = styled.div`
  width: 90%;
  margin-left: 50px;
`;
export const ListItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 8px #00000029;
  padding: 3px 3px 0px 0;
  border-radius: 10px;
`;
export const ListInfo = styled.div`
  display: inline-flex;
  padding: 0px 3px 0px 0;
  margin: 0;
  border: 0;
`;
export const ListTitle = styled.div`
  display: inline-flex;
  font-weight: bold;
  font-size: 15px;
  padding-left: 20px;
`;
export const ListLocation = styled.div`
  color: #7f7f7f;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const ListDate = styled.div`
  color: #7f7f7f;
  font-size: 12px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const ListIcon = styled.div`
  display: flex;
  padding: 0 10px 0 10px;
  width: 30px;
  height: 100%;
`;
export const ProgressBar = styled.div`
  width: 100px;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 20px;
`;
export const Progress = styled.div`
  width: ${(props) => props.percent}%;
  height: 100%;
  background-color: green;
`;

export const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: #f2f2f2;
  width: 100%;
`;

export const DropdownButton = styled.div`
  background: #a6a6a6 0% 0% no-repeat padding-box;
  border: none;
  font-size: 1px;
  color: #ffffff;
  margin: 5px;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #4e84c4;
  }
`;

export const Container = styled.div`
  box-shadow: 0px 2px 8px #00000029;
  background-color: #f2f2f2;
  border-radius: 10px;
  width: 90%;
  margin-left: 50px;
`;

export const CardView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 250px 250px;
  gap: 15px;
  padding: 30px;
`;
export const CardItems = styled.div`
  background-color: #ffffff;
  border: 1px solid #a6a6a6;
  border-radius: 5px;
`;
export const CardHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid #a6a6a6;
  font-weight: bold;
  &:hover {
    background-color: #f0f4ff;
  }
`;
export const CardBody = styled.div`
  padding: 15px 20px;
`;
export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Slider = styled.input.attrs({
  type: "range",
  min: "0",
  step: "1",
  defaultValue: "0",
})`
  width: 100%;
  accent-color: #4e84c4;
`;
export const Remarks = styled.textarea`
  width: 100%;
  height: 80px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 12px;
  border: 1px solid #a6a6a6;
  padding: 10px;
  resize: none;
`;
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  float: right;
`;
export const Checkbox = styled.input.attrs({ type: "checkbox" })``;
export const CheckboxLabel = styled.label`
  margin-left: 5px;
  font-size: 12px;
  font-weight: bold;
`;


