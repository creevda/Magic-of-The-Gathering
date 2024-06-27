/* eslint-disable no-alert */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */

import React, { useState } from 'react';
import './Select.css';

const CustomSelect = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder || options[0]); // Изменение здесь

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedOption}
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option, idx) => (
            <li key={idx} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
