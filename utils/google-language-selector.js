const selectPicker = (e) => {
  // const dropDown = document.getElementById("selectpicker");
  // console.log("first picker selected", e.target.getElementsByTagName("option"));
  const lang = ["English", "French", "German", "Spanish"];
  let options = e.target.getElementsByTagName("option");
  // console.log(options);
  for (var i = 0; i < options.length; i++) {
    // console.log(options[i].innerText);
    options[i].innerText = lang[i];
    // options[i].innerHTML = options[i].value;
    // console.log(options[i].innerText);
  }
};

function googleTranslateElementInit() {
  if (window && window.google && window.google.translate) {
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  } else {
    console.error("google_translate_element initialization failed");
  }
}

export function translateLanguage(e) {
  try {
    googleTranslateElementInit();
    // console.log("language: " + e.target.value);
    var frame = document.querySelector(".VIpgJd-ZVi9od-xl07Ob-OEVmcd");
    if (!frame) {
      console.error("Error: Could not find Google translate frame.");
      // return false;
    } else {
      var spans = frame.contentDocument.querySelectorAll(
        ".VIpgJd-ZVi9od-vH1Gmf-ibnC6b span.text"
      );

      localStorage.setItem("currentLang", e);

      for (var i = 0; i < spans.length; i++) {
        if (spans[i].textContent.includes(e)) {
          spans[i].click();
          spans[i].click();
        }
      }
    }
  } catch (error) {
    console.log("first error: " + error);
  }

  // var spans = document.querySelectorAll(".goog-te-combo option");
  // console.log("spans", spans);

  // localStorage.setItem("currentLang", e);

  // for (var i = 0; i < spans.length; i++) {
  //   // console.log(spans[i].textContent);
  //   if (spans[i].textContent.includes(e)) {
  //     console.log("matched " + spans[i].textContent, e);
  //     console.log(spans[i]);
  //     spans[i].click();
  //     // document
  //     //   .querySelector(".goog-te-combo")
  //     //   .setAttribute("value", spans[i].textContent);
  //     console.log(document.querySelector(".goog-te-combo"));
  //     // spans[i].click();
  //   }
  // }
}
