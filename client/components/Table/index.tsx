/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useTable, usePagination, TableOptions, Column } from "react-table";
import Pagination from "./Pagination";

const Wrapper = styled.div``;

interface Props {
  data: any[];
  columns: any;
  totalPages: number;
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handlePageSelect: (page: number) => void;
}

const Table = ({
  data,
  columns,
  handlePrevious,
  totalPages,
  currentPage,
  handlePageSelect,
  handleNext,
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
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
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
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        handleNext={handleNext}
        handlePageSelect={handlePageSelect}
        handlePrevious={handlePrevious}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};
export default Table;
