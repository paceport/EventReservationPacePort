// import React from 'react';  
// import Select from 'react-select';  
  
 
// const options = [  
//   { value: 'future_of_x', label: 'Future of X' },  
//   { value: 'generative_ai', label: 'Generative AI' },  
//   {value: 'ai/ml' , label: 'AI/ML'}, 
//   {value: 'banking' , label: 'Banking'},
//   {value: 'insurance' , label: 'Insurance'},
//   {value: 'utilties' , label: 'Utilties'},
// ];  


  
// const customStyles = {  
//   option: (provided, state) => ({  
//     ...provided,  
//     height: '30px',  
//     paddingLeft: '10', 
//     fontSize: '10px',
//     color: '#7F7F7F', 
//     borderBottom: '0.5px solid  #00000029',
//     backgroundColor: state.isSelected ? '#00000029' : 'white', 
//     letterSpacing: '0.5px',  
//     '&:hover': {  
//       backgroundColor: 'lightgrey',  
//     },  
//   }),  
//   control: (provided) => ({  
//     ...provided,  
//     textAlign: "left",
//     fontSize: "10px",
//     fontWeight: "600",
//     letterSpacing: "0.43px",
//     color: "#7F7F7F",
//     border: '1px solid grey',  
//     boxShadow: 'none', 
//     borderRadius:  '5px', 
//      '&:hover': {  
//       border: '1px solid #00000029',  
//      },  
//   }),  
// };  
  
// function MySelectComponent({onSelect, name, value}) {  

//   const handleSelectChange = (selectedOption) => {  
//     const event = {  
//       target: {  
//         name: name,
//         value: selectedOption ? selectedOption.value : '',
//       },  
//     };  
//     onSelect(event); 
//   };

//   const selectedValue = options.find(option => option.value === value);  

//   return (  
//     <div>  
      
//       <Select   
//         options= {options}  
//         styles={customStyles} 
//         placeholder= ""  
//         onChange={handleSelectChange}
//         name= {name}
//         value={selectedValue}
//       />  
//     </div>  
//   );  
// }  
  
// export default MySelectComponent;  


import React from "react";
import Select from "react-select";

const options = [
  { value: "AI Exploration", label: "AI Exploration" },
  { value: "AI Show & Tell", label: "AI Show & Tell" },
  { value: "AI Immersion", label: "AI Immersion" },
  { value: "Discovery Workshop", label: "Discovery Workshop" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    height: "30px",
    paddingLeft: "10px",
    fontSize: "10px",
    color: "#7F7F7F",
    borderBottom: "0.5px solid #00000029",
    backgroundColor: state.isSelected ? "#00000029" : "white",
    letterSpacing: "0.5px",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
  }),

  control: (provided) => ({
    ...provided,
    textAlign: "left",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "0.43px",
    color: "#7F7F7F",
    border: "1px solid grey",
    boxShadow: "none",
    borderRadius: "5px",
    "&:hover": {
      border: "1px solid #00000029",
    },
  }),
};

function MySelectComponent({ onSelect, name, value }) {
  const handleSelectChange = (selectedOption) => {
    const event = {
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : "",
      },
    };

    onSelect(event);
  };

  const selectedValue =
    options.find((option) => option.value === value) || null;

  return (
    <div>
      <Select
        options={options}
        styles={customStyles}
        placeholder=""
        onChange={handleSelectChange}
        name={name}
        value={selectedValue}
        isClearable
      />
    </div>
  );
}

export default MySelectComponent;