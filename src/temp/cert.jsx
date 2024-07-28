"use client";
import { generateImageUrl } from "@/utils/generate-certificate/generate-image-url";
import React, { useEffect, useRef, useState } from "react";
// import useReactToPdf from "react-to-pdf";
// import canvg from "canvg";
// import { saveAs } from "file-saver";
// import { createPDF } from "svg-to-pdfkit";
// import PDFDocument from "pdfkit";
// import { Document, Page, View, Image, PDFViewer } from "@react-pdf";

// import jsPDF from "jspdf";

// import SVGtoPDF from "svg-to-pdfkit";
function cert() {
  // const svgRef = useRef(null);
  const [svgImg, setSvgImg] = useState(null);
  const fetchData = async () => {
    const imgPath = await generateImageUrl("omkar sathe");
    // console.log("gdfgdgf", imgPath);
    setSvgImg(imgPath);
  };

  function downloadPDF() {
    let doc = new PDFDocument({
      compress: false,
      layout: "portrait",
      size: [1500, 1050],
    });
    SVGtoPDF(doc, svgImg, 0, 0);
    let stream = doc.pipe(blobStream());
    stream.on("finish", () => {
      let blob = stream.toBlob("application/pdf");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "cert.pdf";
      link.click();
    });
    doc.end();
  }

  useEffect(() => {
    fetchData();
  });
  return (
    <div>
      <button onClick={downloadPDF}>download</button>
      {/* {svgImg} */}
      {/* <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgImg)}`} /> */}
      <div
        id="svg-container"
        // ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svgImg }}
      />
    </div>
  );
}

export default cert;
