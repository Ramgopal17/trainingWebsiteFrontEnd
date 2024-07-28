const hideDropdownCourseMobile = () => {
  const coursesDropDown = document.getElementById("AllCoursesDropdownMobile");
  coursesDropDown.style.display = "none";
};
const showRelatedCategoryCoursesDesc = () => {
  const coursesDropDown = document.getElementById("RelatedCategoryCoursesDesc");
  coursesDropDown.style.display = "block";
};
const passDataToShowDesc = () => {
  hideDropdownCourseMobile();
  showRelatedCategoryCoursesDesc();
};
const hideDropdown = () => {
  const coursesDropDown = document.getElementById("allCoursesDropdown");
  coursesDropDown.style.display = "none";
};
const showDropdownCourseMobile = () => {
  const coursesDropDown = document.getElementById("AllCoursesDropdownMobile");
  coursesDropDown.style.display = "block";
};
const showDropdown = () => {
  const coursesDropDown = document.getElementById("allCoursesDropdown");
  coursesDropDown.style.display = "flex";
};
const hideRelatedCategoryCoursesDesc = () => {
  const coursesDropDown = document.getElementById("RelatedCategoryCoursesDesc");
  coursesDropDown.style.display = "none";
};

const backToCoursesMobile = () => {
  hideRelatedCategoryCoursesDesc();
  showDropdownCourseMobile();
};

const hideCategoryMobile = () => {
  const coursesDropDown = document.getElementById("AllCategoryMobile");
  coursesDropDown.style.display = "none";
};

const backToMainFromCategory = () => {
  hideCategoryMobile();
  showDropdownCourseMobile();
};

const showCategory = () => {
  const coursesDropDown = document.getElementById("AllCategoryMobile");
  coursesDropDown.style.display = "block";
};

const hideCategory = () => {
  const coursesDropDown = document.getElementById("AllCategoryMobile");
  coursesDropDown.style.display = "none";
};

const showCategoryPage = () => {
  hideDropdownCourseMobile();
  showCategory();
};

const passDataToShowCatCourse = () => {
  hideCategoryMobile();
  showRelatedCategoryCoursesDesc();
};

const hideAllCoursesAndCategories = () => {
  // console.log("dfffffffffffffffffffffffffffs");
  hideCategory();
  hideRelatedCategoryCoursesDesc();
  hideDropdownCourseMobile();
};

export {
  hideDropdownCourseMobile,
  showRelatedCategoryCoursesDesc,
  passDataToShowDesc,
  hideDropdown,
  showDropdownCourseMobile,
  showDropdown,
  hideRelatedCategoryCoursesDesc,
  backToCoursesMobile,
  backToMainFromCategory,
  showCategory,
  showCategoryPage,
  passDataToShowCatCourse,
  hideAllCoursesAndCategories,
};
