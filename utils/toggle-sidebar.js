export const hideSidebar = () => {
  const sidebar = document.getElementById("SidebarDiv");
  // console.log(sidebar);
  sidebar.style.left = "-250px";
};

export const showSidebar = () => {
  const sidebar = document.getElementById("SidebarDiv");
  // console.log(sidebar);
  sidebar.style.left = "0px";
};

export const showHidePassword = (e) => {
  const btn = e.target;
  const isShow = btn.getAttribute("isshow");

  if (isShow == "false") {
    btn.className = "fa-solid fa-eye";
    btn.setAttribute("isshow", "true");
    btn.nextSibling.setAttribute("type", "text");
  } else {
    btn.className = "fa-solid fa-eye-slash";
    btn.setAttribute("isshow", "false");
    btn.nextSibling.setAttribute("type", "password");
  }
};
