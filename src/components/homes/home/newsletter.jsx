import Link from "next/link";
import React from "react";
import CustomButton from "../../custom/custom-button";
import {
  NewsletterEmailValidation,
  clearError,
  isFormValid,
} from "@/utils/FormValidation";

function Newsletter() {
  return (
    <div className="theme-bg-7">
      <div className=" container">
        <div className="container pt-50 pb-50 learningExperience">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <span className="tp-section__subtitle shadow-none text-rgb mb-15 p-0">
                    Subscribe
                  </span>

                  <h2 className="tp-section__title mb-40">
                    Subscribe To Newsletter
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row newsletter">
            <div className="col-md-6 tp-section pb-4 pb-md-0">
              <h4>Join 100+ subscribers</h4>

              <p>Stay in the loop with everything you need to know.</p>
            </div>

            <div className="col-md-6 tp-section">
              <form
                className="newsletterForm"
                onSubmit={isFormValid}
                method="POST"
                // action="https://ea7cf473.sibforms.com/serve/MUIFAO6KxVPaQnbyFGM62ibAhPfGy74VNnvPCrEJR22GO5erjz_Zjc_iMwz80rAHA8JpAGYmhuuC3UdQqJgweITn97fkPgdGIef4y2rusAtnksQNwedjeApivdV5yVYiPIqYTDJH6awukRt-SaS80PgoYSOwkX_vws39jDc61bJS_fiOVmUx_dVjEGSwtqU72vZH95eEyB4LJHej"
                action="https://ea7cf473.sibforms.com/serve/MUIFAPmuyD068sP30fPtM_zcgUgksTWfI98mt1t5POK-YVxeThdHgd-VlPiCCKOG-ZxhfOsRIpB81wJF4QlanyBeXfvW4xjfRuyv9_WeT0HGUtkProsWwrj3TsIzkZKsI0OspQHJg4A58PMWFmDxmppUB2UIdTSq3qQ1F4UAnW-CZ-Vczi9GmCso4-vFz53NRCRI3WJbQJP8gdkM"
              >
                <div className="row">
                  <div className="col-lg-8 pb-4 pb-lg-0">
                    <input
                      type="text"
                      name="EMAIL"
                      placeholder="Enter your email"
                      errordiv="errorNewsLetterEMAIL"
                      onBlur={NewsletterEmailValidation}
                      onFocus={() => clearError("errorNewsLetterEMAIL")}
                    />
                    <p className="errorMessage" id="errorNewsLetterEMAIL">
                      error div
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <button type="submit" style={{ width: "100%" }}>
                      SUBSCRIBE
                    </button>
                  </div>
                </div>

                {/* <CustomButton url="/" text="Subscribe" /> */}
              </form>

              <p className="pt-10 policyLink">
                We care about your data in our
                <Link href="/privacy-policy"> privacy policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
