export const checkAboveCheckBox = () => {
  // Assuming you have a container div with the id "checkboxContainer" wrapping all the checkboxes
  const container = document.querySelector(".checkboxContainer");

  // Find all the checkboxes within the container
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');

  // Attach a click event listener to each checkbox
  // checkboxes.forEach(function (checkbox, index) {
  //   checkbox.addEventListener("click", function () {
  //     // Check if all checkboxes above this checkbox are checked
  //     let allAboveChecked = true;
  //     for (let i = 0; i < index; i++) {
  //       if (!checkboxes[i].checked) {
  //         allAboveChecked = false;
  //         break;
  //       }
  //     }

  //     // Output the result based on allAboveChecked
  //     if (allAboveChecked) {
  //       console.log("All checkboxes above are checked.");
  //     } else {
  //       console.log("Not all checkboxes above are checked.");
  //     }
  //   });
  // });
};
