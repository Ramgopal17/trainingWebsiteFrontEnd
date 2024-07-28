import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const faq_data = [
  {
    id: 1,
    question: "Who can attend this training?",
    answer: (
      <>
        Anyone with a 10+2 certificate and wants to be a technical writer can
        enroll themselves for this training.
      </>
    ),
    accordion_id: "faq1",
    collapsed: "",
    data_bs_target: "#collapseOne",
    aria_expanded: true,
    aria_controls: "collapseOne",
    show: "show",
  },
  {
    id: 2,
    question: "What will I learn in this training course?",
    answer: (
      <>
        This course is ideal for people who need a solid understanding of basics
        and best practices to be followed while writing any technical
        documentation, such as user manual, getting started guide, knowledge
        articles, and many more.
      </>
    ),
    accordion_id: "faq2",
    collapsed: "collapsed",
    data_bs_target: "#collapseTwo",
    aria_expanded: false,
    aria_controls: "collapseTwo",
    show: "",
  },
  {
    id: 3,
    question: "How do I register myself for the training?",
    answer: (
      <>
        Please contact us at +91-986-080-0135 or send an email to
        training@metapercept.com.
      </>
    ),
    accordion_id: "faq3",
    collapsed: "collapsed",
    data_bs_target: "#collapseThree",
    aria_expanded: false,
    aria_controls: "collapseThree",
    show: "",
  },
  {
    id: 4,
    question: "What is the mode of training?",
    answer: (
      <>
        We have two modes for conducting the training <br />
        <strong>Classroom:</strong> We conduct this training in our Pune, India
        office.
        <br />
        <strong>Online:</strong> We conduct real-time training via different
        virtual platforms such as Google Meet, Google Hangout, or Skype.
      </>
    ),
    accordion_id: "faq4",
    collapsed: "collapsed",
    data_bs_target: "#collapseFour",
    aria_expanded: false,
    aria_controls: "collapseFour",
    show: "",
  },
  {
    id: 5,
    question: "What are the benefits of Technical Writing Training?",
    answer: (
      <>
        We’ve compiled a list of benefits to expect when getting trained on
        Technical Writing
        <br />
        <strong>Clear Communication:</strong> Helps you deliver high-quality and
        well-versed documentation and manuals for your organization.
        <br /> <strong>Awareness:</strong> Create effective technical
        communication that will resonate well with the user’s perspective.
        <br /> <strong>Reduced-cost:</strong> A well written and easy to
        understand manual results in a reduction of service calls to your
        technical department.
        <br /> <strong>Professional formatting and presentation:</strong> It
        will be easy for you to design a document that represents your
        documentation. Using the right font, color, style, and logos make it
        yours.
      </>
    ),
    accordion_id: "faq5",
    collapsed: "collapsed",
    data_bs_target: "#collapseFive",
    aria_expanded: false,
    aria_controls: "collapseFive",
    show: "",
  },
  {
    id: 6,
    question: "How do I make payment?",
    answer: (
      <>
        Payments can be made through NEFT/ UPI/Paytm or Paypal or offline via
        cheques if you are from the same location.
        <br />
        Full payment must be made in advance. Any amount once paid is
        non-refundable.
      </>
    ),
    accordion_id: "faq6",
    collapsed: "collapsed",
    data_bs_target: "#collapseSix",
    aria_expanded: false,
    aria_controls: "collapseSix",
    show: "",
  },
  {
    id: 7,
    question: "Within how many days, I have to take the test?",
    answer: (
      <>Within one month of training completion, one should take the test.</>
    ),
    accordion_id: "faq7",
    collapsed: "collapsed",
    data_bs_target: "#collapseSeven",
    aria_expanded: false,
    aria_controls: "collapseSeven",
    show: "",
  },
];
function Faq({ faq }) {
  // console.log(faq);
  return (
    <>
      <style jsx global>
        {`
          .tp-accordion .accordion-button {
            box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.08);
          }
        `}
      </style>

      {faq?.length > 0 ? (
        <div className="theme-bg-7">

        <div className="container  pt-25 pb-25 ">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <h2 className="tp-section__title mb-20">
                    Frequently asked questions
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 wow tpfadeUp">
              <div className="seo-faq-cotent  sv-fea-area">
                <div className="accordion tp-accordion" id="accordionExample" >
              
                  {faq?.map((item, i) => (
                    <div key={i} className="accordion-item" style={{backgroundColor:"transparent"}}>
                      <h2
                        className="accordion-header"
                        id={faq_data[i]?.accordion_id}
                      >
                        <button
                          className={`accordion-button ${faq_data[i]?.collapsed}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={faq_data[i]?.data_bs_target}
                          aria-expanded={faq_data[i]?.aria_expanded}
                          aria-controls={faq_data[i]?.aria_controls}
                          style={{ paddingRight: "30px" ,backgroundColor:"white"}}
                        >
                          {item?.attributes?.Questions}
                        </button>
                      </h2>
                      <div
                        id={faq_data[i]?.aria_controls}
                        className={`accordion-collapse collapse ${faq_data[i]?.show}`}
                        aria-labelledby={faq_data[i]?.accordion_id}
                        data-bs-parent="#accordionExample"
                      >
                        <div
                          className="accordion-body tp-section"
                          style={{ padding: "10px" }}
                        >
                          {/* <p>{item?.attributes?.Answers}</p> */}
                          <ReactMarkdown
                            children={
                              // activeCourse?.attributes?.Key_Features
                              item?.attributes?.Answers
                            }
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            // transformImageUri={(uri) =>
                            //   uri.startsWith("http") ? uri : `${globalEnv.api}${uri}`
                            // }
                            className="markdown"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <div className="theme-bg-7">

        <div className="container  pt-50 pb-50 ">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <span className="tp-section__subtitle shadow-none text-rgb mb-15 p-0">
                    FAQ
                  </span>

                  <h2 className="tp-section__title mb-40">
                    Frequently Asked Questions
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </div>
        </div>
        </div>
      )}
    </>
  );
}

export default Faq;
