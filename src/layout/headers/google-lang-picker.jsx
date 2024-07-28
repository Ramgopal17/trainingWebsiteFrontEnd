import { translateLanguage } from "@/utils/google-language-selector";
import React, { useEffect, useState } from "react";

function GoogleLangPicker({ classes = "" }) {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    // console.log(localStorage.getItem("currentLang"), language);
    let lang = localStorage.getItem("currentLang") || "English";
    if (lang) {
      // console.log("first run");
      translateLanguage(lang);
    }
    // window.onload = function () {
    //   console.log("in window.onload", lang);
    //   translateLanguage(lang);
    // };
    setLanguage(lang);
  }, []);
  return (
    <select
      key={language}
      className={` selectpicker ${classes}`}
      id="selectpicker"
      data-width="fit"
      defaultValue={language}
      onChange={(e) => {
        translateLanguage(e.target.value);
      }}
    >
      <option value="English" translate="no">
        en - English
      </option>
      <option value="French" translate="no">
        fr - French
      </option>
      <option value="German" translate="no">
        de - German
      </option>
      <option value="Spanish" translate="no">
        es - Spanish
      </option>
    </select>
  );
}

export default GoogleLangPicker;
