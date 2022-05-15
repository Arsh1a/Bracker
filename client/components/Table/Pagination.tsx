import React from "react";
import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

const Arrow = styled.span`
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  handlePrevious: () => void;
  handleNext: () => void;
  handlePageSelect: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  handlePrevious,
  handleNext,
  handlePageSelect,
  currentPage,
  totalPages,
}: Props) => {
  const renderPaginationButtons = () => {
    // Checks if it is needed to do complex logic to render the pagination buttons
    if (totalPages <= 5) {
      const pages = [];
      let i: number;
      for (i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages.map((page) => {
        return (
          <button
            style={{ color: page === currentPage ? "red" : "black" }}
            key={page}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </button>
        );
      });
      // If there are more than 5 pages, it will render complex logic to render the pagination buttons
      // This is a big mess but it works pretty well. I hope I'll find  a better way to do it (Probably never)
    } else {
      return (
        <>
          {currentPage === 1 ? null : currentPage === totalPages - 1 ? (
            <>
              <button onClick={() => handlePageSelect(1)}>{1}</button>
              ...
              <button onClick={() => handlePageSelect(currentPage - 2)}>{currentPage - 2}</button>
              <button onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</button>
            </>
          ) : currentPage === totalPages ? (
            <>
              <button onClick={() => handlePageSelect(1)}>{1}</button>
              ...
              <button onClick={() => handlePageSelect(currentPage - 3)}>{currentPage - 3}</button>
              <button onClick={() => handlePageSelect(currentPage - 2)}>{currentPage - 2}</button>
              <button onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</button>
            </>
          ) : currentPage === 3 ? (
            <>
              <button onClick={() => handlePageSelect(1)}>{1}</button>
              <button onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</button>
            </>
          ) : currentPage > 3 ? (
            <>
              <button onClick={() => handlePageSelect(1)}>{1}</button>...
              <button onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</button>
            </>
          ) : (
            <button onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</button>
          )}
          {/*Before currentPage */}
          <button style={{ color: "red" }}>{currentPage}</button>
          {/*After currentPage */}
          {currentPage === 1 ? (
            <>
              <button onClick={() => handlePageSelect(currentPage + 1)}> {currentPage + 1}</button>
              <button onClick={() => handlePageSelect(currentPage + 2)}>{currentPage + 2}</button>
              ... <button onClick={() => handlePageSelect(totalPages)}> {totalPages} </button>
            </>
          ) : currentPage === totalPages - 2 ? (
            <>
              <button onClick={() => handlePageSelect(currentPage + 1)}>{currentPage + 1}</button>
              <button onClick={() => handlePageSelect(totalPages)}>{totalPages}</button>
            </>
          ) : currentPage === totalPages - 1 ? (
            <button onClick={() => handlePageSelect(totalPages)}>{totalPages}</button>
          ) : currentPage === totalPages ? null : (
            <>
              <button onClick={() => handlePageSelect(currentPage + 1)}> {currentPage + 1} </button>
              ... <button onClick={() => handlePageSelect(totalPages)}> {totalPages} </button>
            </>
          )}
        </>
      );
    }
  };

  return (
    <Wrapper>
      <Arrow onClick={handlePrevious}>
        <MdOutlineKeyboardArrowLeft />
      </Arrow>
      {renderPaginationButtons()}
      <Arrow onClick={handleNext}>
        <MdOutlineKeyboardArrowRight />
      </Arrow>
    </Wrapper>
  );
};
export default Pagination;
