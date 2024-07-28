import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CertificateTemplate from "../generate-certificate/certificate-template";

import html2canvas from "html2canvas";
import { useAuthContext } from "@/context/Auth-context";
import { getUserSingleCompletedCourse } from "@/api/get-user-single-completed-Course";
import Loader from "@/src/common/loader";
import Swal from "sweetalert2";
import { generateImageUrl } from "@/utils/generate-certificate/generate-image-url";
import { getUserProcesses } from "@/api/get-user-progresses";
import { courseCompleteDate, expiryDate } from "@/utils/calculate-course-time";
import { checkTestimonialPresent } from "@/api/check-testimonial-present";
function Download() {
  const { user } = useAuthContext();
  // console.log("Downloading", user);
  const [screenshot, setScreenshot] = useState(null);
  const [completedCourse, setCompletedCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [svgImg, setSvgImg] = useState(null);

  const handleCaptureClick = () => {
    // console.log("in click");
    const divToCapture = document.getElementById("capture-div");

    html2canvas(divToCapture).then(function (canvas) {
      const screenshotUrl = canvas.toDataURL("image/png");

      setScreenshot(screenshotUrl);
      handleDownloadClick();
    });
  };

  const handleDownloadClick = () => {
    // console.log("in download");

    if (screenshot) {
      const a = document.createElement("a");
      // console.log(a);
      a.href = screenshot;
      a.download = `${user?.First_Name}-${completedCourse?.Title}.png`;
      a.click();
    } else {
      // console.log("dfsdfsd");
    }
  };

  const fetchSvgImg = async (course) => {
    let progresses = await getUserProcesses(user?.id);
    // console.log("first progress", progresses);
    let courseData = progresses?.filter(
      (progress) => progress?.Course_Title == course?.Title
    );

    let completedDate = courseCompleteDate(courseData[0]?.updatedAt);
    let expiredDate = expiryDate(courseData[0]?.updatedAt);

    // console.log(completedDate, "gdfgdgf", user);
    let name = `${user?.First_Name} ${user?.Last_Name}`;
    const imgPath = await generateImageUrl(
      name,
      course?.Title,
      completedDate,
      expiredDate
    );
    // console.log("gdfgdgf", imgPath);
    setSvgImg(imgPath);
  };

  function downloadPDF() {
    let doc = new PDFDocument({
      compress: false,
      layout: "portrait",
      // size: [1500, 1050],
      size: [1045, 720],
    });
    SVGtoPDF(doc, svgImg, 0, 0);
    let stream = doc.pipe(blobStream());
    stream.on("finish", () => {
      let blob = stream.toBlob("application/pdf");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${user?.First_Name}-${completedCourse?.Title}.pdf`;
      link.click();
    });
    doc.end();
  }
  const router = useRouter();
  const fetchData = async () => {
    setLoading(true);
    let course = await getUserSingleCompletedCourse(
      user?.id,
      router?.query?.courseid
    );
    setCompletedCourse(course);
    // console.log("download course ", course);
    let isPresent = await checkTestimonialPresent(user?.id, course?.Title);
    // console.log(isPresent);
    if (!isPresent) {
      Swal.fire({
        icon: "warning",
        title: "Course review not found",
        text: "Please give your review before download the certificate",
        confirmButtonText: "OK",
      });
      router.push(
        `/user/course/lecture?name=${course?.Title}&slug=${course?.Slug}&courseid=${course?.id}#review`
      );
    }
    fetchSvgImg(course);
    setLoading(false);
  };

  useEffect(() => {
    if (!(user?.First_Name && user?.Last_Name)) {
      Swal.fire({
        icon: "warning",
        title: "Name required",
        text: "Please fill your name before creating a certificate",
        confirmButtonText: "OK",
      });
      router.push(`/user/profile?id=${user?.Uuid}`);
    } else {
      fetchData();
    }
  }, []);
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center pt-50 pb-200">
          <Loader />
        </div>
      ) : (
        <div className="downloadContainer container pt-20 pb-50">
          <div className="backBtn">
            <i
              className="fa-solid fa-circle-arrow-left"
              onClick={() => router.back()}
            ></i>
          </div>
          <div className="certificateInfo pt-20">
            <div className="courseName tp-section">
              <p className="mb-0">
                Congrats, you have unlocked your certificate for
              </p>
              <h2 className="tp-section__title">{completedCourse?.Title}</h2>
            </div>
            <div className="row pt-50">
              <div className="col-lg-6">
                {/* <img
                src="\assets\img\certificate-made.webp"
                alt=""
                className="CourseCertificateImg"
              /> */}
                {/* <CertificateTemplate completedCourse={completedCourse} /> */}
                <div
                  id="svg-container"
                  // ref={svgRef}
                  dangerouslySetInnerHTML={{ __html: svgImg }}
                />
              </div>
              <div className="col-lg-6 ps-lg-5 pt-50 pt-lg-0 tp-section">
                <h4 className="heading">Share your achievement !</h4>
                <p>
                  Get new opportunities by sharing the certificate on Linkedin
                  and other platforms.
                </p>
                <div className="socialMediaLinks">
                  <Link href={"#"}>
                    <div className="linkedin links">
                      <i class="fa-brands fa-linkedin-in"></i>
                    </div>
                  </Link>
                  <Link href={"#"}>
                    <div className="facebook links">
                      <i class="fa-brands fa-facebook-f"></i>
                    </div>
                  </Link>
                  <Link href={"#"}>
                    <div className="twitter links">
                      <i class="fa-brands fa-twitter"></i>
                    </div>
                  </Link>
                </div>
                <hr />
                <h4 className="heading">Download Certificate</h4>
                <div className="downloadCertificate">
                  <i class="fa-solid fa-circle-down" onClick={downloadPDF}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Download;
