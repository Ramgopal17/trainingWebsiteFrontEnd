const findHeaderHeight = () => {
  let header = document.getElementById("header-sticky");
  // return 0;
  // let headerHeight = getComputedStyle(header).height.slice(0, -2);
  // setTimeout(() => {
  //   window.scrollTo({
  //     top: window.scrollY - headerHeight,
  //     behavior: "smooth",
  //   });
  // }, 10);
  return getComputedStyle(header).height;
};

export default findHeaderHeight;
