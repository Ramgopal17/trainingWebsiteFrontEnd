// document.getElementById("downloadPDF").addEventListener("click", function () {
import html2canvas from "html2canvas";
function getScreenshotOfElement(element, posX, posY, width, height, callback) {
  // console.log("dfsdfdfdf");
  html2canvas(element, {
    onrendered: function (canvas) {
      var context = canvas.getContext("2d");
      var imageData = context.getImageData(posX, posY, width, height).data;
      var outputCanvas = document.createElement("canvas");
      var outputContext = outputCanvas.getContext("2d");
      outputCanvas.width = width;
      outputCanvas.height = height;
      var idata = outputContext.createImageData(width, height);
      idata.data.set(imageData);
      outputContext.putImageData(idata, 0, 0);
      callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
    },
    width: width,
    height: height,
    useCORS: true,
    taintTest: false,
    allowTaint: false,
  });
}

export const downloadCertificate = () => {
  var content2 = document.getElementById("content2");

  getScreenshotOfElement(
    content2,
    50,
    50,
    content2.offsetWidth,
    content2.offsetHeight,
    function (data) {
      var pdf = new jsPDF("l", "pt", [
        content2.offsetWidth,
        content2.offsetHeight,
      ]);

      pdf.addImage(
        "data:image/png;base64," + data,
        "PNG",
        0,
        0,
        content2.offsetWidth,
        content2.offsetHeight
      );

      pdf.save("azimuth-certificate.pdf");
    }
  );
};
// });
