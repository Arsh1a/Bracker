import React from "react";
import styled from "styled-components";
import Button from "../../Common/Button";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

interface Props {
  setFilters: (filters: any) => void;
  filters: any;
}

const TopFilters = ({ setFilters, filters }: Props) => {
  const handleClick = (status: "Open" | "Closed" | "Inprogress" | "All") => {
    // Setting to page 1 cause we are changing the status and we want to see the first page (otherwise it wont show any ticket)
    setFilters({ ...filters, status, page: 1 });
  };

  return (
    <Wrapper>
      Status :
      <Button
        disabled={filters.status === "All"}
        color="primary"
        onClick={() => handleClick("All")}
      >
        All
      </Button>
      <Button
        disabled={filters.status === "Open"}
        color="primary"
        onClick={() => handleClick("Open")}
      >
        Open
      </Button>
      <Button
        disabled={filters.status === "Inprogress"}
        color="primary"
        onClick={() => handleClick("Inprogress")}
      >
        Inprogress
      </Button>
      <Button
        disabled={filters.status === "Closed"}
        color="primary"
        onClick={() => handleClick("Closed")}
      >
        Closed
      </Button>
    </Wrapper>
  );
};
export default TopFilters;
