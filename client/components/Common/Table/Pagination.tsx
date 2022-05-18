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
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  color: ${(props) => props.theme.colors.gray};
`;

const PagesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-weight: 500;
  gap: 5px;
  li {
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    color: ${(props) => props.theme.colors.gray};
    &:hover {
      background-color: ${(props) => props.theme.colors.lightPrimary};
    }
  }

  .active {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const Dots = styled.span`
  padding: 5px 5px;
  font-size: 1rem;
  letter-spacing: 2px;
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
          <li
            className={currentPage === page ? "active" : ""}
            key={page}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </li>
        );
      });
      // If there are more than 5 pages, it will render complex logic to render the pagination buttons
      // This is a big mess but it works pretty well. I hope I'll find  a better way to do it (Probably never)
    } else {
      return (
        <>
          {currentPage === 1 ? null : currentPage === totalPages - 1 ? (
            <>
              <li onClick={() => handlePageSelect(1)}>{1}</li>
              <Dots>...</Dots>
              <li onClick={() => handlePageSelect(currentPage - 2)}>{currentPage - 2}</li>
              <li onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</li>
            </>
          ) : currentPage === totalPages ? (
            <>
              <li onClick={() => handlePageSelect(1)}>{1}</li>
              <Dots>...</Dots>
              <li onClick={() => handlePageSelect(currentPage - 3)}>{currentPage - 3}</li>
              <li onClick={() => handlePageSelect(currentPage - 2)}>{currentPage - 2}</li>
              <li onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</li>
            </>
          ) : currentPage === 3 ? (
            <>
              <li onClick={() => handlePageSelect(1)}>{1}</li>
              <li onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</li>
            </>
          ) : currentPage > 3 ? (
            <>
              <li onClick={() => handlePageSelect(1)}>{1}</li>
              <Dots>...</Dots>
              <li onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</li>
            </>
          ) : (
            <li onClick={() => handlePageSelect(currentPage - 1)}>{currentPage - 1}</li>
          )}
          {/*Before currentPage */}
          <li className="active">{currentPage}</li>
          {/*After currentPage */}
          {currentPage === 1 ? (
            <>
              <li onClick={() => handlePageSelect(currentPage + 1)}>{currentPage + 1}</li>
              <li onClick={() => handlePageSelect(currentPage + 2)}>{currentPage + 2}</li>
              <Dots>...</Dots>
              <li onClick={() => handlePageSelect(totalPages)}>{totalPages}</li>
            </>
          ) : currentPage === totalPages - 2 ? (
            <>
              <li onClick={() => handlePageSelect(currentPage + 1)}>{currentPage + 1}</li>
              <li onClick={() => handlePageSelect(totalPages)}>{totalPages}</li>
            </>
          ) : currentPage === totalPages - 1 ? (
            <li onClick={() => handlePageSelect(totalPages)}>{totalPages}</li>
          ) : currentPage === totalPages ? null : (
            <>
              <li onClick={() => handlePageSelect(currentPage + 1)}>{currentPage + 1}</li>
              <Dots>...</Dots>
              <li onClick={() => handlePageSelect(totalPages)}>{totalPages}</li>
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
      <PagesList>{renderPaginationButtons()}</PagesList>
      <Arrow onClick={handleNext}>
        <MdOutlineKeyboardArrowRight />
      </Arrow>
    </Wrapper>
  );
};
export default Pagination;
