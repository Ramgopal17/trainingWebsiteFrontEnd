"use client";
import { translateLanguage } from "@/utils/google-language-selector";
import React, { useEffect, useState } from "react";

function GoogleLangPickerWithFlag() {
  const options = [
    {
      label: "En",
      image: "/assets/img/country/english.png",
      language: "English",
    },
    {
      label: "Es",
      image: "/assets/img/country/spain.png",
      language: "Spanish",
    },
    {
      label: "De",
      image: "/assets/img/country/german.png",
      language: "German",
    },

    {
      label: "Fr",
      image: "/assets/img/country/france.png",
      language: "French",
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  // const [language, setLanguage] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    let lang = localStorage.getItem("currentLang") || "English";
    if (lang) {
      translateLanguage(lang);
    }

    // setLanguage(lang);
    let tempSelected = options.filter((option) => option.language == lang);
    // console.log(tempSelected);
    selectOption(tempSelected[0]);
  }, []);

  return (
    <>
      <div className="dropdownCustom">
        <div className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedOption ? (
            <img
              src={selectedOption.image}
              alt={selectedOption.language}
              width={20}
              className="dropdown-option-image mr-10"
            />
          ) : (
            <img
              src={options[0].image}
              alt={options[0].language}
              width={20}
              className="dropdown-option-image mr-10"
            />
          )}
          <span className="dropdown-option-label" translate="no">
            {selectedOption ? selectedOption.label : "en"}
          </span>
          {/* <span className="dropdown-caret"></span> */}
          <ul
            className={`dropdown-menu-custom ps-0 ${
              isDropdownOpen ? "d-block" : "d-none"
            }`}
          >
            {options.map((option, index) => (
              <li
                className="me-0 d-block"
                key={index}
                onClick={() => {
                  selectOption(option);
                  translateLanguage(option.language);
                }}
                translate="no"
              >
                <img
                  width={20}
                  src={option.image}
                  alt={option.language}
                  className="dropdown-option-image mr-10"
                />
                <span className="dropdown-option-label">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GoogleLangPickerWithFlag;
