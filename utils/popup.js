export const displayPopup = (id) => {
  const div = document.getElementById(id);
  // console.log(div);
  div.style.display = "flex";
};
export const hidePopup = (id) => {
  const div = document.getElementById(id);
  // console.log(div);
  div.style.display = "none";
};
