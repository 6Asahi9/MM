import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
