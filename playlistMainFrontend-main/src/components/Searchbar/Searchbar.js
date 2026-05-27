import styled from "styled-components";

export const SearchContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 40px;
border-radius: 19px;
border: 1px  #D9D9D9;
padding: 10px;
box-shadow: inset 0px 0.5px 5px #00000029;

@media only screen and (min-width: 468px) and (max-width: 868px) {
   width:fit-content;
     float: left;
      position: relative;
      height: auto;
}
   
`;

export const SearchInput = styled.input`
display: flex;
width: 250px;
height: 20px;
font-size: 10px;
transition: width 0.3s ease-in-out;
//box-shadow:  0px 3px 12px #00000029;

@media(max-width: 468){
width: 100%;
}



`;






