import { scrollTop } from "@/hooks/scroll-top";
import React, { useEffect } from "react";

const showPrevNextBtn = (e) => {
  const current = document.getElementById("current");
  const liList = document.querySelectorAll(".paginationLI li");
  liList.forEach((li) => {
    li.classList.remove("displayPageBtn");
  });
  // console.log(liList);
  // console.log(current);
  const prev = current?.previousElementSibling;
  const next = current?.nextElementSibling;
  if (prev) {
    prev.style.display = "inline-block !important";
    prev.classList.add("displayPageBtn");
    // console.log("Previous", prev);
  }
  if (next) {
    next.style.display = "inline-block !important";
    next.classList.add("displayPageBtn");
    // console.log("next", next);
  }
};

function Pagination({
  dataPerPage,
  totalData,
  setCurrentPage,
  previousPage,
  nextPage,
  currentPage,
}) {
  const pageNumbers = [];
  useEffect(() => {
    showPrevNextBtn();
  }, [currentPage]);

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <style jsx global>
        {`
          .PrevNextPageBtn {
            display: inline-block;
            width: 50px;
            height: 50px;
            line-height: 46px;
            text-align: center;
            border-radius: 7px;
            border: 2px solid #f1f1f1;
            font-size: 14px;
            font-weight: 400;
          }
          .paginationLI li span {
            background-color: white;
          }
          .page-number {
            display: none !important;
          }
          .displayPageBtn {
            display: inline-block !important;
          }
          .basic-pagination ul li#current {
            display: inline-block !important;
          }
          .page-number:nth-child(-n + 2),
          .page-number:nth-last-child(-n + 2) {
            display: inline-block !important;
          }
          .basic-pagination ul li span{
            margin-bottom:10px !important;
          }
        `}
      </style>
      {dataPerPage < totalData && (
        <div className="basic-pagination text-center">
          <nav>
            <ul className="paginationLI">
              <li
                onClick={() => {
                  previousPage();
                  scrollTop();
                }}
              >
                <span className="PrevNextPageBtn">
                  <i className="fal fa-angle-double-left"></i>
                </span>
              </li>

              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className="page-number"
                  id={`${number == currentPage && "current"}`}
                  onClick={() => {
                    setCurrentPage(number);
                    scrollTop();
                  }}
                >
                  <span className={`${number == currentPage && "current"} `}>
                    {number}{" "}
                  </span>
                </li>
              ))}
              <li
                onClick={() => {
                  nextPage();
                  scrollTop();
                }}
              >
                <span className="PrevNextPageBtn ">
                  <i className="fal fa-angle-double-right"></i>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Pagination;
