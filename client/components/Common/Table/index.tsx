/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useTable, usePagination, TableOptions, Column } from "react-table";
import Pagination from "./Pagination";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Wrapper = styled.div``;

const StyledTable = styled.table`
  width: 100%;
  border-radius: 10px;
  box-shadow: rgb(10 19 23 / 5%) 0px 2px 8px 0px;
  background-color: white;
  padding: 20px;

  th {
    text-align: left;
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    &:hover {
      opacity: 0.6;
    }
    svg {
      position: absolute;
      top: 3px;
      left: -15px;
    }
  }
`;

interface Props {
  data: any[];
  columns: any;
  totalPages: number;
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handlePageSelect: (page: number) => void;
  handleSort: (id: string) => void;
  sort: string;
  order: "desc" | "asc";
}

const Table = ({
  data,
  columns,
  handlePrevious,
  totalPages,
  currentPage,
  handlePageSelect,
  handleNext,
  handleSort,
  order,
  sort,
}: Props) => {
  const options: TableOptions<any> = {
    data,
    columns,
    manualPagination: true,
    manualSortBy: true,
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    options,
    usePagination
  );

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  onClick={() => {
                    handleSort(column.id);
                  }}
                >
                  {sort !== column.id ? null : order === "desc" ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )}
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      {data.length > 0 && (
        <Pagination
          handleNext={handleNext}
          handlePageSelect={handlePageSelect}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};
export default Table;
