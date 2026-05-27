import styled from "styled-components";
export const Label = styled.label`
  display: flex;
  gap: 10px;
`;
export const Switch = styled.div`
  position: relative;
  width: 50px;
  height: 25px;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 30px;
  box-shadow: inset 4px 6px 12px #00000029;
  padding: 2px;
  transition: 300ms all;
  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    box-shadow: 0px 3px 6px #00000029;
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 30px;
    top: 50%;
    left: -2;

    background: white;
    transform: translate(0, -50%);
  }
`;
export const Input = styled.input`
  display: none;
  box-shadow: inset 4px 6px 12px #00000029;
  &:checked + ${Switch} {
    background-color: #4bee61;
    box-shadow: inset 4px 6px 12px #00000029;
    &:before {
      transform: translate(29px, -50%);
    }
  }
`;


