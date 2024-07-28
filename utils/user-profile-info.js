const department = ["Development", "Testing", "marketing", "IT"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let yearsArr = [];
const yearGen = () => {
  const CurrentYear = new Date().getFullYear();
  // console.log(CurrentYear);
  for (let i = 1970; i <= CurrentYear; i++) {
    yearsArr.push(i);
  }
  yearsArr.reverse();
};
yearGen();

const years = yearsArr;

export const removeChildOfParent = (parent, childClass) => {
  // const parentDiv = document.getElementById(parent);
  // parentDiv.textContent = "";
  var container = document.getElementById(parent);
  var elements = container && container.getElementsByClassName(childClass);

  while (elements[0]) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

export const addWorkExperience = (work = {}) => {
  // console.log("work", work);
  const workExperienceDiv = document.getElementById("workExperienceDiv");
  let singleExpWrapper = document.createElement("div");
  singleExpWrapper.classList.add("singleExpWrapper");

  singleExpWrapper.innerHTML = `
  <div class="deleteBtn d-flex justify-content-end p-3 pe-1">
    <i class="fa-solid fa-circle-minus"></i>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">Designation</p>
      </div>
      <div class="col-xl-8 col-md-9">
        <input type="text" class="textInp workDesignation" value="${
          work?.Designation || ""
        } " />
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">Company</p>
      </div>
      <div class="col-xl-8 col-md-9">
        <input type="text" class="textInp workCompany" value="${
          work?.Company || ""
        }" />
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">Department</p>
      </div>
      <div class="col-xl-8 col-md-9">
        <select name="" id="" class="textInp workDepartment" >
          <option  value="select">
            Select
          </option>
          ${department.map((dept, i) => {
            return `<option value="${dept}" ${
              work.Department == dept ? "selected" : ""
            }>${dept} </option>`;
          })}
        </select>
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">From</p>
      </div>
      <div class="col-xl-8 col-md-9 d-md-flex d-block">
        <div class="mr-10 mb-10">
          <select
            name=""
            id=""
            class="workDurationInp workFromMonth"
            
          >
            <option disabled selected value="Month">
              Month
            </option>

            ${months.map((month, i) => {
              return `<option key=${i} value="${month}" ${
                work?.From_Month == month ? "selected" : ""
              }>
                  ${month}
                </option>`;
            })}
          </select>
          <select
            name=""
            id=""
            class="workDurationInp workFromYear"
            style={{ marginRight: "10px" }}
           
          >
            <option disabled value="Year">
              Year
            </option>

            ${years.map((year, i) => {
              return `<option key={i} value="${year}" ${
                work?.From_Year == year ? "selected" : ""
              }>
                  ${year}
                </option>`;
            })}
          </select>
          To
        </div>
        <div>
          <select
            name=""
            id=""
            class="workDurationInp toMonthSelect workToMonth"
            ${work?.Current ? "disabled" : ""}
         
          >
            <option disabled value="Month">
              Month
            </option>

            ${months.map((month, i) => {
              return `<option key={i} value="${month}" ${
                work?.To_Month == month ? "selected" : ""
              }>
                  ${month}
                </option>`;
            })}
          </select>
          <select
            name=""
            id=""
            class="workDurationInp toYearSelect workToYear"
            ${work?.Current ? "disabled" : ""}
          >
            <option disabled value="Year">
              Year
            </option>

            ${years.map((year, i) => {
              return `<option key={i} value="${year}" ${
                work?.To_Year == year ? "selected" : ""
              }>
                  ${year}
                </option>`;
            })}
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-3">
        <p class="mb-0">Current</p>
      </div>
      <div class="col-xl-8 col-9">
        <input type="checkbox" ${
          work?.Current ? "checked" : ""
        } class="genderInp currentWork workCurrent" />
      </div>
    </div>
  </div>
`;

  const deleteBtn = singleExpWrapper.querySelector(".deleteBtn i");
  deleteBtn.addEventListener("click", () => {
    singleExpWrapper.remove();
  });
  const currentWorkBtn = singleExpWrapper.querySelector(".currentWork");
  currentWorkBtn.addEventListener("change", (e) => {
    const toMonthSelect = singleExpWrapper.querySelector(".toMonthSelect");
    const toYearSelect = singleExpWrapper.querySelector(".toYearSelect");
    // console.log(e.target.checked);
    if (e.target.checked) {
      toMonthSelect.setAttribute("disabled", "disabled");
      toYearSelect.setAttribute("disabled", "disabled");
    } else {
      toMonthSelect.removeAttribute("disabled");
      toYearSelect.removeAttribute("disabled");
    }
    // singleExpWrapper.remove();
  });

  workExperienceDiv.appendChild(singleExpWrapper);

  // workExperienceDiv.insertAdjacentHTML("beforeend", singleExpWrapper);
};

export const addAcademics = (academic = {}) => {
  const AcademicsDiv = document.getElementById("AcademicsDiv");
  let singleAcademicWrapper = document.createElement("div");
  singleAcademicWrapper.classList.add("singleAcademicWrapper");

  singleAcademicWrapper.innerHTML = `
  
  <div class="deleteBtn d-flex justify-content-end p-3 pe-1">
    <i class="fa-solid fa-circle-minus"></i>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">Qualification</p>
      </div>
      <div class="col-xl-8 col-md-9">
        <input type="text" class="textInp academicQualification" value="${
          academic?.Qualification || ""
        }" />
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">College/School</p>
      </div>
      <div class="col-xl-8 col-md-9">
        <input type="text" class="textInp academicClgScl" value="${
          academic?.College_School || ""
        }" />
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">Specialization</p>
      </div>
      <div class="col-xl-8 col-md-9">
        <input type="text" class="textInp academicSpecialization" value="${
          academic?.Specialisation || ""
        }" />
      </div>
    </div>
  </div>

  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-md-3">
        <p class="mb-0">From</p>
      </div>
      <div class="col-xl-8 col-md-9 d-md-flex d-block">
        <div class="mr-10 mb-10">
          <select
            name=""
            id=""
            class="workDurationInp academicFromMonth"
          
          >
            <option disabled selected>
              Month
            </option>

            ${months.map((month, i) => {
              return `<option key=${i} value=${month} ${
                academic?.From_Month == month ? "selected" : ""
              }>
                  ${month}
                </option>`;
            })}
          </select>
          <select
            name=""
            id=""
            class="workDurationInp academicFromYear"
            style={{ marginRight: "10px" }}
       
          >
            <option disabled selected value="Year">
              Year
            </option>

            ${years.map((year, i) => {
              return `<option key=${i} value=${year} ${
                academic?.From_Year == year ? "selected" : ""
              }>
                  ${year}
                </option>`;
            })}
          </select>
          To
        </div>
        <div>
          <select
            name=""
            id=""
            class="workDurationInp toMonthSelect academicToMonth"
            ${academic?.Current ? "disabled" : ""}
          >
            <option disabled selected value="Month">
              Month
            </option>

            ${months.map((month, i) => {
              return `<option key=${i} value=${month} ${
                academic?.To_Month == month ? "selected" : ""
              }>
                  ${month}
                </option>`;
            })}
          </select>
          <select
            name=""
            id=""
            class="workDurationInp toYearSelect academicToYear"
            ${academic?.Current ? "disabled" : ""}
          >
            <option disabled selected value="Year">
              Year
            </option>

            ${years.map((year, i) => {
              return `<option key=${i} value=${year} ${
                academic?.To_Year == year ? "selected" : ""
              }>
                  ${year}
                </option>`;
            })}
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="row input-item align-items-center">
      <div class="col-xl-4 col-3">
        <p class="mb-0">Current</p>
      </div>
      <div class="col-xl-8 col-9">
        <input type="checkbox" ${
          academic?.Current ? "checked" : ""
        } class="genderInp currentWork academicCurrent" />
      </div>
    </div>
  </div>

`;

  const deleteBtn = singleAcademicWrapper.querySelector(".deleteBtn i");
  deleteBtn.addEventListener("click", () => {
    singleAcademicWrapper.remove();
  });

  const currentAcademicBtn =
    singleAcademicWrapper.querySelector(".currentWork");
  currentAcademicBtn.addEventListener("change", (e) => {
    const toMonthSelect = singleAcademicWrapper.querySelector(".toMonthSelect");
    const toYearSelect = singleAcademicWrapper.querySelector(".toYearSelect");
    // console.log(e.target.checked);
    if (e.target.checked) {
      toMonthSelect.setAttribute("disabled", "disabled");
      toYearSelect.setAttribute("disabled", "disabled");
    } else {
      toMonthSelect.removeAttribute("disabled");
      toYearSelect.removeAttribute("disabled");
    }
    // singleExpWrapper.remove();
  });

  AcademicsDiv.appendChild(singleAcademicWrapper);
};

export const addInterest = (interest = "") => {
  const InterestDiv = document.getElementById("InterestDiv");
  let singleInterestWrapper = document.createElement("div");
  singleInterestWrapper.classList.add("singleInterestWrapper", "col-md-6");

  singleInterestWrapper.innerHTML = `
  <div class="deleteBtn d-flex justify-content-end p-3 pe-1">
    <i class="fa-solid fa-circle-minus"></i>
  </div>
  <input type="text" name="${interest}" reffor="interest" class="textInp" value="${interest}" />
`;

  const deleteBtn = singleInterestWrapper.querySelector(".deleteBtn i");
  deleteBtn.addEventListener("click", () => {
    singleInterestWrapper.remove();
  });
  InterestDiv.appendChild(singleInterestWrapper);
};
