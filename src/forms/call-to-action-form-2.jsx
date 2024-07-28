import {
  clearError,
  courseValidation,
  emailValidation,
  fullNameValidation,
  isFormValid,
  phoneValidation,
} from "@/utils/FormValidation";
import React from "react";

function CallToActionForm() {
  function reloadImg() {
    if (document.getElementById("imgid").src.indexOf("&d") !== -1) {
      document.getElementById("imgid").src =
        document
          .getElementById("imgid")
          .src.substring(
            0,
            document.getElementById("imgid").src.indexOf("&d")
          ) +
        "&d" +
        new Date().getTime();
    } else {
      document.getElementById("imgid").src =
        document.getElementById("imgid").src + "&d" + new Date().getTime();
    }
  }

  function privacyAlert1832254000000780019() {
    var privacyTool = document.getElementById("privacyTool1832254000000780019");
    var privacyErr = document.getElementById("privacyErr1832254000000780019");
    if (privacyTool != undefined && !privacyTool.checked) {
      privacyErr.style.visibility = "visible";
      privacyTool.focus();
      return false;
    }
    return true;
  }
  function disableErr1832254000000780019() {
    var privacyTool = document.getElementById("privacyTool1832254000000780019");
    var privacyErr = document.getElementById("privacyErr1832254000000780019");
    if (
      privacyTool != undefined &&
      privacyTool.checked &&
      privacyErr != undefined
    ) {
      privacyErr.style.visibility = "hidden";
    }
  }

  function checkMandatory1832254000000780019(e) {
    if (isFormValid(e)) {
      if (privacyAlert1832254000000780019()) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    } else {
      e.preventDefault();
      return false;
    }
  }
  return (
    <>
      <style jsx>
        {`
          .input-item,
          .input-item-textarea textarea {
            border-radius: 8px;

            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
              rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
          }
          .input-item input,
          .input-item select,
          .input-item-textarea textarea {
            background-color: white;

            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
              rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
          }
          .errorMessage {
            display: none;
            margin: -10px 0 5px 5px;
            color: red;
          }
          form i {
            color: rgb(108, 96, 254);
          }
          form input,
          form select,
          form textarea {
            border: none;
            outline: none;
          }
          .it-cta-form-submit {
            background-color: rgb(108, 96, 254);
          }
          .it-cta-form-submit:hover {
            background-color: rgb(50, 77, 160);
          }
          .formContainer {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 6px;
            padding: 30px 20px;
            border-radius: 8px;
            background-color: white;
          }
        `}
      </style>
      <div className="col-xl-10 col-lg-8 formContainer ">
        <h4 className="text-center pb-20">Request more information</h4>
        <div className="wf-parent">
          <div
            className="wf-wrapper"
            id="BiginWebToRecordFormDiv4616081000000319021"
          >
            <form
              id="BiginWebToRecordForm4616081000000319021"
              name="BiginWebToRecordForm4616081000000319021"
              action="https://bigin.zoho.com/crm/WebForm"
              className="wf-form-component"
              // data-ux-form-alignment="left"
              method="POST"
              // encType="multipart/form-data"
              onSubmit={checkMandatory1832254000000780019}
              // acceptCharset="UTF-8"
            >
              {/* Do not remove this code. */}
              <input
                type="text"
                style={{ display: "none" }}
                name="xnQsjsdp"
                defaultValue="77ce00d060f1100a447b6bb7955ccb11d1bb0a7edea466769c61eeb4ce141479"
              />
              <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" />
              <input
                type="text"
                style={{ display: "none" }}
                name="xmIwtLD"
                defaultValue="8289ed838bcde07eecf0c4bb5feec3ea6929de7500735f99170e0b2f93a74508e12c33e48936321f3113722543d9b190"
              />
              <input
                type="text"
                style={{ display: "none" }}
                name="actionType"
                defaultValue="Q29udGFjdHM="
              />
              <input
                type="text"
                style={{ display: "none" }}
                name="returnURL"
                defaultValue="https://metapercept.com"
              />

              <div
                id="elementDiv4616081000000319021"
                className="wf-form-wrapper row it-cta-form mt-0"
              >
                <div className="wf-row col-lg-12">
                  <div className="wf-field wf-field-mandatory">
                    <div className="wf-field-inner input-item">
                      <span>
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        name="Last Name"
                        maxLength={80}
                        placeholder="Full Name"
                        type="text"
                        className="wf-field-item wf-field-input"
                        errordiv="errorFULLNAME"
                        onBlur={fullNameValidation}
                        onFocus={() => clearError("errorFULLNAME")}
                      />
                    </div>
                  </div>
                  <p className="errorMessage" id="errorFULLNAME">
                    error div
                  </p>
                </div>
                <div className="wf-row col-lg-12">
                  <div className="wf-field">
                    <div className="wf-field-inner input-item">
                      <span>
                        <i className="fas fa-envelope-open"></i>
                      </span>
                      <input
                        fvalidate="true"
                        ftype="email"
                        name="Email"
                        placeholder="Email"
                        maxLength={100}
                        type="text"
                        className="wf-field-item wf-field-input"
                        errordiv="errorEMAIL"
                        onBlur={emailValidation}
                        onFocus={() => clearError("errorEMAIL")}
                      />
                    </div>
                  </div>
                  <p className="errorMessage" id="errorEMAIL">
                    error div
                  </p>
                </div>
                <div className="wf-row col-sm-5">
                  <div className="wf-field wf-field-mandatory">
                    <div className="wf-field-inner input-item">
                      <span>
                        <i className="fa-solid fa-location-crosshairs"></i>
                      </span>
                      <select
                        name="CONTACTCF2"
                        className="wf-field-item wf-field-dropdown"
                        data-wform-field="select"
                      >
                        <option value="India (+91)">India (+91)</option>
                        <option value="Algeria (+213)">Algeria (+213)</option>
                        <option value="Andorra (+376)">Andorra (+376)</option>
                        <option value="Anguilla (+1264)">
                          Anguilla (+1264)
                        </option>
                        <option value="Antigua & Barbuda (+1268)">
                          Antigua &amp; Barbuda (+1268)
                        </option>
                        <option value="Argentina (+54)">Argentina (+54)</option>
                        <option value="Armenia (+374)">Armenia (+374)</option>
                        <option value="Aruba (+297)">Aruba (+297)</option>
                        <option value="Australia (+61)">Australia (+61)</option>
                        <option value="Austria (+43)">Austria (+43)</option>
                        <option value="Azerbaijan (+994)">
                          Azerbaijan (+994)
                        </option>
                        <option value="Bahrain (+973)">Bahrain (+973)</option>
                        <option value="Bangladesh (+880)">
                          Bangladesh (+880)
                        </option>
                        <option value="Barbados (+1246)">
                          Barbados (+1246)
                        </option>
                        <option value="Belarus (+375)">Belarus (+375)</option>
                        <option value="Belgium (+32)">Belgium (+32)</option>
                        <option value="Belize (+501)">Belize (+501)</option>
                        <option value="Benin (+229)">Benin (+229)</option>
                        <option value="Bermuda (+1441)">Bermuda (+1441)</option>
                        <option value="Bhutan (+975)">Bhutan (+975)</option>
                        <option value="Bolivia (+591)">Bolivia (+591)</option>
                        <option value="Bosnia Herzegovina (+387)">
                          Bosnia Herzegovina (+387)
                        </option>
                        <option value="Botswana (+267)">Botswana (+267)</option>
                        <option value="Brazil (+55)">Brazil (+55)</option>
                        <option value="Brunei (+673)">Brunei (+673)</option>
                        <option value="Bulgaria (+359)">Bulgaria (+359)</option>
                        <option value="Burkina Faso (+226)">
                          Burkina Faso (+226)
                        </option>
                        <option value="Burundi (+257)">Burundi (+257)</option>
                        <option value="Cameroon (+237)">Cameroon (+237)</option>
                        <option value="Cambodia (+855)">Cambodia (+855)</option>
                        <option value="Canada (+1)">Canada (+1)</option>
                        <option value="Cape Verde Islands (+238)">
                          Cape Verde Islands (+238)
                        </option>
                        <option value="Cayman Islands (+1345)">
                          Cayman Islands (+1345)
                        </option>
                        <option value="Central African Republic (+236)">
                          Central African Republic (+236)
                        </option>
                        <option value="Chile (+56)">Chile (+56)</option>
                        <option value="China (+86)">China (+86)</option>
                        <option value="Colombia (+57)">Colombia (+57)</option>
                        <option value="Comoros (+269)">Comoros (+269)</option>
                        <option value="Congo (+242)">Congo (+242)</option>
                        <option value="Cook Islands (+682)">
                          Cook Islands (+682)
                        </option>
                        <option value="Costa Rica (+506)">
                          Costa Rica (+506)
                        </option>
                        <option value="Croatia (+385)">Croatia (+385)</option>
                        <option value="Cuba (+53)">Cuba (+53)</option>
                        <option value="Cyprus North (+90392)">
                          Cyprus North (+90392)
                        </option>
                        <option value="Cyprus South (+357)">
                          Cyprus South (+357)
                        </option>
                        <option value="Czech Republic (+42)">
                          Czech Republic (+42)
                        </option>
                        <option value="Denmark (+45)">Denmark (+45)</option>
                        <option value="Djibouti (+253)">Djibouti (+253)</option>
                        <option value="Dominica (+1809)">
                          Dominica (+1809)
                        </option>
                        <option value="Dominican Republic (+1809)">
                          Dominican Republic (+1809)
                        </option>
                        <option value="Ecuador (+593)">Ecuador (+593)</option>
                        <option value="Egypt (+20)">Egypt (+20)</option>
                        <option value="El Salvador (+503)">
                          El Salvador (+503)
                        </option>
                        <option value="Equatorial Guinea (+240)">
                          Equatorial Guinea (+240)
                        </option>
                        <option value="Eritrea (+291)">Eritrea (+291)</option>
                        <option value="Estonia (+372)">Estonia (+372)</option>
                        <option value="Ethiopia (+251)">Ethiopia (+251)</option>
                        <option value="Falkland Islands (+500)">
                          Falkland Islands (+500)
                        </option>
                        <option value="Faroe Islands (+298)">
                          Faroe Islands (+298)
                        </option>
                        <option value="Fiji (+679)">Fiji (+679)</option>
                        <option value="Finland (+358)">Finland (+358)</option>
                        <option value="France (+33)">France (+33)</option>
                        <option value="French Guiana (+594)">
                          French Guiana (+594)
                        </option>
                        <option value="French Polynesia (+689)">
                          French Polynesia (+689)
                        </option>
                        <option value="Gabon (+241)">Gabon (+241)</option>
                        <option value="Gambia (+220)">Gambia (+220)</option>
                        <option value="Georgia (+7880)">Georgia (+7880)</option>
                        <option value="Gibraltar (+350)">
                          Gibraltar (+350)
                        </option>
                        <option value="Germany (+49)">Germany (+49)</option>
                        <option value="Ghana (+233)">Ghana (+233)</option>
                        <option value="Greece (+30)">Greece (+30)</option>
                        <option value="Greenland (+299)">
                          Greenland (+299)
                        </option>
                        <option value="Grenada (+1473)">Grenada (+1473)</option>
                        <option value="Guadeloupe (+590)">
                          Guadeloupe (+590)
                        </option>
                        <option value="Guam (+671)">Guam (+671)</option>
                        <option value="Guatemala (+502)">
                          Guatemala (+502)
                        </option>
                        <option value="Guinea (+224)">Guinea (+224)</option>
                        <option value="Guinea - Bissau (+245)">
                          Guinea - Bissau (+245)
                        </option>
                        <option value="Guyana (+592)">Guyana (+592)</option>
                        <option value="Haiti (+509)">Haiti (+509)</option>
                        <option value="Honduras (+504)">Honduras (+504)</option>
                        <option value="Hong Kong (+852)">
                          Hong Kong (+852)
                        </option>
                        <option value="Hungary (+36)">Hungary (+36)</option>
                        <option value="Iceland (+354)">Iceland (+354)</option>
                        <option value="Indonesia (+62)">Indonesia (+62)</option>
                        <option value="Iran (+98)">Iran (+98)</option>
                        <option value="Iraq (+964)">Iraq (+964)</option>
                        <option value="Ireland (+353)">Ireland (+353)</option>
                        <option value="Israel (+972)">Israel (+972)</option>
                        <option value="Italy (+39)">Italy (+39)</option>
                        <option value="Jamaica (+1876)">Jamaica (+1876)</option>
                        <option value="Japan (+81)">Japan (+81)</option>
                        <option value="Jordan (+962)">Jordan (+962)</option>
                        <option value="Kazakhstan (+7)">Kazakhstan (+7)</option>
                        <option value="Kenya (+254)">Kenya (+254)</option>
                        <option value="Kiribati (+686)">Kiribati (+686)</option>
                        <option value="Korea North (+850)">
                          Korea North (+850)
                        </option>
                        <option value="Korea South (+82)">
                          Korea South (+82)
                        </option>
                        <option value="Kuwait (+965)">Kuwait (+965)</option>
                        <option value="Kyrgyzstan (+996)">
                          Kyrgyzstan (+996)
                        </option>
                        <option value="Laos (+856)">Laos (+856)</option>
                        <option value="Latvia (+371)">Latvia (+371)</option>
                        <option value="Lebanon (+961)">Lebanon (+961)</option>
                        <option value="Lesotho (+266)">Lesotho (+266)</option>
                        <option value="Liberia (+231)">Liberia (+231)</option>
                        <option value="Libya (+218)">Libya (+218)</option>
                        <option value="Lithuania (+370)">
                          Lithuania (+370)
                        </option>
                        <option value="Luxembourg (+352)">
                          Luxembourg (+352)
                        </option>
                        <option value="Macao (+853)">Macao (+853)</option>
                        <option value="Macedonia (+389)">
                          Macedonia (+389)
                        </option>
                        <option value="Madagascar (+261)">
                          Madagascar (+261)
                        </option>
                        <option value="Malawi (+265)">Malawi (+265)</option>
                        <option value="Malaysia (+60)">Malaysia (+60)</option>
                        <option value="Maldives (+960)">Maldives (+960)</option>
                        <option value="Mali (+223)">Mali (+223)</option>
                        <option value="Malta (+356)">Malta (+356)</option>
                        <option value="Marshall Islands (+692)">
                          Marshall Islands (+692)
                        </option>
                        <option value="Martinique (+596)">
                          Martinique (+596)
                        </option>
                        <option value="Mauritania (+222)">
                          Mauritania (+222)
                        </option>
                        <option value="Mayotte (+269)">Mayotte (+269)</option>
                        <option value="Mexico (+52)">Mexico (+52)</option>
                        <option value="Micronesia (+691)">
                          Micronesia (+691)
                        </option>
                        <option value="Moldova (+373)">Moldova (+373)</option>
                        <option value="Monaco (+377)">Monaco (+377)</option>
                        <option value="Mongolia (+976)">Mongolia (+976)</option>
                        <option value="Montserrat (+1664)">
                          Montserrat (+1664)
                        </option>
                        <option value="Morocco (+212)">Morocco (+212)</option>
                        <option value="Mozambique (+258)">
                          Mozambique (+258)
                        </option>
                        <option value="Myanmar (+95)">Myanmar (+95)</option>
                        <option value="Namibia (+264)">Namibia (+264)</option>
                        <option value="Nauru (+674)">Nauru (+674)</option>
                        <option value="Nepal (+977)">Nepal (+977)</option>
                        <option value="Netherlands (+31)">
                          Netherlands (+31)
                        </option>
                        <option value="New Caledonia (+687)">
                          New Caledonia (+687)
                        </option>
                        <option value="New Zealand (+64)">
                          New Zealand (+64)
                        </option>
                        <option value="Nicaragua (+505)">
                          Nicaragua (+505)
                        </option>
                        <option value="Niger (+227)">Niger (+227)</option>
                        <option value="Nigeria (+234)">Nigeria (+234)</option>
                        <option value="Niue (+683)">Niue (+683)</option>
                        <option value="Norfolk Islands (+672)">
                          Norfolk Islands (+672)
                        </option>
                        <option value="Northern Marianas (+670)">
                          Northern Marianas (+670)
                        </option>
                        <option value="Norway (+47)">Norway (+47)</option>
                        <option value="Oman (+968)">Oman (+968)</option>
                        <option value="Palau (+680)">Palau (+680)</option>
                        <option value="Pakistan (+92)">Pakistan (+92)</option>
                        <option value="Panama (+507)">Panama (+507)</option>
                        <option value="Papua New Guinea (+675)">
                          Papua New Guinea (+675)
                        </option>
                        <option value="Paraguay (+595)">Paraguay (+595)</option>
                        <option value="Peru (+51)">Peru (+51)</option>
                        <option value="Philippines (+63)">
                          Philippines (+63)
                        </option>
                        <option value="Poland (+48)">Poland (+48)</option>
                        <option value="Portugal (+351)">Portugal (+351)</option>
                        <option value="Puerto Rico (+1787)">
                          Puerto Rico (+1787)
                        </option>
                        <option value="Qatar (+974)">Qatar (+974)</option>
                        <option value="Reunion (+262)">Reunion (+262)</option>
                        <option value="Romania (+40)">Romania (+40)</option>
                        <option value="Russia (+7)">Russia (+7)</option>
                        <option value="Rwanda (+250)">Rwanda (+250)</option>
                        <option value="San Marino (+378)">
                          San Marino (+378)
                        </option>
                        <option value="Sao Tome & Principe (+239)">
                          Sao Tome &amp; Principe (+239)
                        </option>
                        <option value="Saudi Arabia (+966)">
                          Saudi Arabia (+966)
                        </option>
                        <option value="Senegal (+221)">Senegal (+221)</option>
                        <option value="Serbia (+381)">Serbia (+381)</option>
                        <option value="Seychelles (+248)">
                          Seychelles (+248)
                        </option>
                        <option value="Sierra Leone (+232)">
                          Sierra Leone (+232)
                        </option>
                        <option value="Singapore (+65)">Singapore (+65)</option>
                        <option value="Slovak Republic (+421)">
                          Slovak Republic (+421)
                        </option>
                        <option value="Slovenia (+386)">Slovenia (+386)</option>
                        <option value="Solomon Islands (+677)">
                          Solomon Islands (+677)
                        </option>
                        <option value="Somalia (+252)">Somalia (+252)</option>
                        <option value="South Africa (+27)">
                          South Africa (+27)
                        </option>
                        <option value="Spain (+34)">Spain (+34)</option>
                        <option value="Sri Lanka (+94)">Sri Lanka (+94)</option>
                        <option value="St. Helena (+290)">
                          St. Helena (+290)
                        </option>
                        <option value="St. Kitts (+1869)">
                          St. Kitts (+1869)
                        </option>
                        <option value="St. Lucia (+1758)">
                          St. Lucia (+1758)
                        </option>
                        <option value="Sudan (+249)">Sudan (+249)</option>
                        <option value="Suriname (+597)">Suriname (+597)</option>
                        <option value="Swaziland (+268)">
                          Swaziland (+268)
                        </option>
                        <option value="Sweden (+46)">Sweden (+46)</option>
                        <option value="Switzerland (+41)">
                          Switzerland (+41)
                        </option>
                        <option value="Syria (+963)">Syria (+963)</option>
                        <option value="Taiwan (+886)">Taiwan (+886)</option>
                        <option value="Tajikstan (+7)">Tajikstan (+7)</option>
                        <option value="Thailand (+66)">Thailand (+66)</option>
                        <option value="Togo (+228)">Togo (+228)</option>
                        <option value="Tonga (+676)">Tonga (+676)</option>
                        <option value="Trinidad & Tobago (+1868)">
                          Trinidad &amp; Tobago (+1868)
                        </option>
                        <option value="Tunisia (+216)">Tunisia (+216)</option>
                        <option value="Turkey (+90)">Turkey (+90)</option>
                        <option value="Turkmenistan (+7)">
                          Turkmenistan (+7)
                        </option>
                        <option value="Turkmenistan (+993)">
                          Turkmenistan (+993)
                        </option>
                        <option value="Turks & Caicos Islands (+1649)">
                          Turks &amp; Caicos Islands (+1649)
                        </option>
                        <option value="Tuvalu (+688)">Tuvalu (+688)</option>
                        <option value="Uganda (+256)">Uganda (+256)</option>
                        <option value="UK (+44)">UK (+44)</option>
                        <option value="Ukraine (+380)">Ukraine (+380)</option>
                        <option value="United Arab Emirates (+971)">
                          United Arab Emirates (+971)
                        </option>
                        <option value="Uruguay (+598)">Uruguay (+598)</option>
                        <option value="USA (+1)">USA (+1)</option>
                        <option value="Uzbekistan (+7)">Uzbekistan (+7)</option>
                        <option value="Vanuatu (+678)">Vanuatu (+678)</option>
                        <option value="Vatican City (+379)">
                          Vatican City (+379)
                        </option>
                        <option value="Venezuela (+58)">Venezuela (+58)</option>
                        <option value="Vietnam (+84)">Vietnam (+84)</option>
                        <option value="Virgin Islands - British (+1284)">
                          Virgin Islands - British (+1284)
                        </option>
                        <option value="Virgin Islands - US (+1340)">
                          Virgin Islands - US (+1340)
                        </option>
                        <option value="Wallis & Futuna (+681)">
                          Wallis &amp; Futuna (+681)
                        </option>
                        <option value="Yemen (North)(+969)">
                          Yemen (North)(+969)
                        </option>
                        <option value="Yemen (South)(+967)">
                          Yemen (South)(+967)
                        </option>
                        <option value="Zambia (+260)">Zambia (+260)</option>
                        <option value="Zimbabwe (+263)">Zimbabwe (+263)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="wf-row col-sm-7">
                  <div className="wf-field">
                    <div className="wf-field-inner input-item">
                      <span>
                        <i className="fas fa-phone"></i>
                      </span>
                      <input
                        fvalidate="true"
                        ftype="mobile"
                        name="Phone"
                        placeholder="Phone"
                        maxLength={50}
                        type="text"
                        className="wf-field-item wf-field-input"
                        errordiv="errorMOBILE"
                        onBlur={phoneValidation}
                        onFocus={() => clearError("errorMOBILE")}
                      />
                    </div>
                  </div>
                  <p className="errorMessage" id="errorMOBILE">
                    error div
                  </p>
                </div>
                <div className="wf-row col-lg-12">
                  <div className="wf-field wf-field-mandatory">
                    <div className="wf-field-inner input-item">
                      <span>
                        <i className="fas fa-book"></i>
                      </span>
                      <select
                        name="CONTACTCF4"
                        className="wf-field-item wf-field-dropdown"
                        data-wform-field="select"
                        errordiv="errorCourse"
                        onClick={courseValidation}
                        // onFocus={() => clearError("errorCourse")}
                      >
                        <option value="select course" disabled selected>
                          select course
                        </option>
                        <option value="Technical Writing Basic">
                          Technical Writing Basic
                        </option>
                        <option value="Technical Writing Advanced">
                          Technical Writing Advanced
                        </option>
                        <option value="DITA-XML Basic">DITA-XML Basic</option>
                        <option value="DITA-XML Advanced">
                          DITA-XML Advanced
                        </option>
                        <option value="API Documentation Advanced">
                          API Documentation Advanced
                        </option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Information Architecture">
                          Information Architecture
                        </option>
                        <option value="API Documentation Basic">
                          API Documentation Basic
                        </option>
                        <option value="Content Strategy">
                          Content Strategy
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <p className="errorMessage" id="errorCourse">
                    error div
                  </p>
                </div>
                <div className="wf-row col-lg-12">
                  <div className="wf-field">
                    <div className="wf-field-inner input-item-textarea ">
                      <span>
                        <i className="fas fa-pen"></i>
                      </span>
                      <textarea
                        style={{ height: " 100px" }}
                        name="Description"
                        placeholder="Description"
                        maxLength={32000}
                        type="text"
                        className="wf-field-item wf-field-input"
                        errordiv="errorDESC"
                        onFocus={() => clearError("errorDESC")}
                      />
                    </div>
                  </div>
                  <p className="errorMessage" id="errorDESC">
                    error div
                  </p>
                </div>
                {/* =========================== */}
                <div className="zcwf_row mt-20 mb-10">
                  <div className="zcwf_privacy">
                    <div className="d-flex gap-3">
                      <div className="dIB vat" align="left">
                        <div className="displayPurpose  f13">
                          <label className="newCustomchkbox-md dIB w100per">
                            <input
                              autoComplete="off"
                              id="privacyTool1832254000000780019"
                              type="checkbox"
                              name="privacyTool"
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                              onClick={disableErr1832254000000780019}
                            />
                          </label>
                        </div>
                      </div>
                      <label htmlFor="privacyTool1832254000000780019">
                        <div
                          className="dIB zcwf_privacy_txt"
                          style={{
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                        >
                          I agree to read to{" "}
                          <a
                            href="https://metapercept.com/gdpr/termsandconditions"
                            target="_blank"
                            style={{ color: "rgb(108,96,254)" }}
                          >
                            Terms of Service,
                          </a>{" "}
                          and share my details.
                        </div>
                      </label>
                    </div>
                    <div
                      id="privacyErr1832254000000780019"
                      style={{
                        fontSize: "14px",
                        color: "red",
                        paddingLeft: "5px",
                        visibility: "hidden",
                      }}
                    >
                      Please accept this
                    </div>
                  </div>
                </div>
                {/* =========================== */}
                <div
                  className="wf-row col-lg-12 mb-3"
                  data-ux-field-appearance="captcha"
                >
                  <div className="wf-field">
                    <div className="wf-field-inner  row">
                      <div className="col-md-6 col-lg-12 ">
                        <div className="input-item">
                          <span>
                            <i className="fa-solid fa-unlock"></i>
                          </span>
                          <input
                            type="text"
                            placeholder="Enter the captcha"
                            id="enterdigest4616081000000319021"
                            name="enterdigest"
                            className="wf-field-item wf-field-input wform-field-item-captcha-input"
                          />
                        </div>
                      </div>
                      <div className="wf-field-captcha-img-wrap col-md-6 col-lg-12 d-flex  align-items-center justify-content-around">
                        <img
                          id="imgid"
                          alt="captcha image"
                          className="wf-field-captcha-img"
                          src="https://bigin.zoho.com/crm/CaptchaServlet?formId=8289ed838bcde07eecf0c4bb5feec3ea6929de7500735f99170e0b2f93a74508e12c33e48936321f3113722543d9b190&grpid=77ce00d060f1100a447b6bb7955ccb11d1bb0a7edea466769c61eeb4ce141479"
                        />
                        <div className="cP reload-captcha" onClick={reloadImg}>
                          <span className="reload-img">
                            <i
                              className="fa-solid fa-rotate"
                              style={{ fontSize: "30px", cursor: "pointer" }}
                            ></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wf-row wf-btn-row col-lg-12">
                  <div className="wf-label" data-ux-empty-label="true" />
                  <div className="wform-btn-wrap">
                    <input
                      id="formsubmit"
                      type="submit"
                      className="wf-btn it-cta-form-submit"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 255, 0.2) 0px 4px 6px -1px, rgba(0, 0, 255, 0.1) 0px 2px 4px -1px",
                      }}
                      defaultValue="Submit"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CallToActionForm;
