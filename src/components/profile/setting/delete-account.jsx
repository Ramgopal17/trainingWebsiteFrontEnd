import { deleteUserAccount } from "@/api/delete-user-account";
import { removeToken } from "@/api/manage-session";
import { useAuthContext } from "@/context/Auth-context";
import Loader from "@/src/common/loader";
import { displayPopup, hidePopup } from "@/utils/popup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
function DeleteAccount() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  // console.log(user);
  const deleteUserAcc = () => {
    const conformDelete = async () => {
      setLoading(true);
      const result = await deleteUserAccount(user?.id);
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Account deleted successfully",
          text: "Your account has been deleted successfully from our database",
          confirmButtonText: "OK",
        });
        removeToken();
        setUser(null);
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error in deleting account",
          text: "Please try again later to delete your account",
          confirmButtonText: "OK",
        });
      }
      setLoading(false);
    };
    Swal.fire({
      title: "Delete Account",
      icon: "warning",
      text: "Are you sure to delete your account?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // removeToken();
        conformDelete();
        // console.log("account delete removed");
        // setUser(null);
        // router.push("/");
      }
    });
  };
  // console.log("in delete div");
  return (
    <>
      <div className="deleteAccount">
        <h4 className="mb-15">Delete my account</h4>
        <p>
          If you delete your account, your personal information will be wiped
          from Metapercept's servers, all of your course activity will be
          anonymized and any certificates earned will be deleted. This action
          cannot be undone!
        </p>
        <div className="newsletterForm " style={{ minWidth: "160px" }}>
          <button
            type="submit"
            className="buttonTextSize"
            onClick={() => displayPopup("popupDeleteContainer")}
          >
            Delete Account
          </button>
        </div>
        {loading && (
          <div
            className="d-flex justify-content-center pt-50"
            // style={{ top: "50%", left: "50%", transform: "translateX(-50%)" }}
          >
            <Loader />
          </div>
        )}

        {/* =========popup=========== */}
        <div className="popupContainer" id="popupDeleteContainer">
          <div className="popupNotification">
            <i
              className="fa-regular fa-circle-xmark closePopup"
              onClick={() => hidePopup("popupDeleteContainer")}
            ></i>
            <div className="courseName">
              <h3>Delete Account</h3>
            </div>
            <div className="courseDesc">
              <h5>
                Deleting your account will delete the following data forever and
                you will not be able to retrieve it once deleted.
              </h5>
              <ul>
                <li>
                  <p className="mb-0">
                    Access to course videos or any learning information
                  </p>
                </li>
                <li>
                  <p className="mb-0">Course progress</p>
                </li>
                <li>
                  <p>Any unlocked certificates</p>
                </li>
              </ul>
              <p>
                you will not be able to access your account as soon as you
                confirm delete account.
              </p>
              <div className="actionBtn newsletterForm row justify-content-around">
                <div className="col-lg-5">
                  <button
                    type="submit"
                    onClick={() => {
                      hidePopup("popupDeleteContainer");
                      deleteUserAcc();
                    }}
                  >
                    Delete my account
                  </button>
                </div>
                <div className="col-lg-5 pt-lg-0 pt-3">
                  <button
                    type="submit"
                    onClick={() => hidePopup("popupDeleteContainer")}
                  >
                    I want to stay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ==  </div>==================loader============ */}
    </>
  );
}

export default DeleteAccount;
