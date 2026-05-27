import React, { createContext, useContext, useState, useEffect } from 'react';  
  
const FormContext = createContext();  
  
export const useForm = () => useContext(FormContext);  
  
export const FormProvider = ({ children }) => {  
  const [formData, setFormData] = useState({  
    session: {
      empID: '',  
      name: '',  
      role: '',
    },

    detailed: {
       bannerText: '',  
       bannerDetailedText: '', 
       bannerImage: [], 
       bannerImageData: '',
       bannerVideo: [],
       bannerVideoData: '', 
    },
    overview:{
      sessionName: '',  
      sessionDescription: '',  
      overviewImage: [],  
      category: '',
      overviewImageData: '',
      duration: '',
    }  
   
      
    
  });  
   

  
  
  const updateFormData = (section, name, value) => {  
    setFormData((prevData) => ({  
      ...prevData,  
      [section]: {  
        ...prevData[section],  
        [name]: value,  
      },  
    }));  
  };   
  
  return (  
    <FormContext.Provider value={{ formData, updateFormData  }}>  
      {children}  
    </FormContext.Provider>  
  );  
};  
