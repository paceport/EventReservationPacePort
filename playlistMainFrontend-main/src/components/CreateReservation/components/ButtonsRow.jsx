import React, { useState } from 'react';  
import '../styles/ButtonsRow.css';
  
const categories = [  
    { name: 'All' },  
    { name: 'AI/ML' },  
    { name: 'Gen AI' },  
    { name: 'FoX' },  
    { name: 'Banking' },  
    { name: 'Insurance' },  
    { name: 'Utilities' },  
    { name: 'Retail' },  
    { name: 'Manufacturing' },  
    { name: 'Healthcare' },  
    { name: 'Telecom' }  
];  
  
export default function ButtonsRow() {  
    const [selectedCategories, setSelectedCategories] = useState([]);  
  
    const handleButtonClick = (categoryName) => {  
        setSelectedCategories((prevSelected) => {  
            if (prevSelected.includes(categoryName)) {  
                return prevSelected.filter(name => name !== categoryName);  
            } else {  
                return [...prevSelected, categoryName];  
            }  
        });  
    };  
  
    return (  
        <div className="buttons-row">  
            {categories.map((category, index) => (  
                <button  
                    key={index}  
                    onClick={() => handleButtonClick(category.name)}  
                    className={`category-button ${selectedCategories.includes(category.name) ? 'selected' : ''}`}  
                >  
                    {category.name}  
                </button>  
            ))}  
        </div>  
    );  
}  


