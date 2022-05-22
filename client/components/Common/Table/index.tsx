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
  border-collapse: collapse;
  th {
    text-align: left;
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    color: ${(props) => props.theme.colors.gray};
    &:hover {
      opacity: 0.6;
    }
    svg {
      position: absolute;
      bottom: 16px;
    }
  }
  th,
  td {
    padding: 15px;
  }
  tr {
    border-bottom: 1px solid ${(props) => props.theme.colors.light};
  }
  tbody tr:last-child {
    border-bottom: none;
  }
  //Border radius over table
  tr:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
`;

interface Props extends React.ComponentPropsWithRef<"table"> {
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
  ...rest
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
      <StyledTable {...getTableProps()} {...rest}>
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
                  {column.render("Header")}
                  {sort !== column.id ? null : order === "desc" ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )}
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
                  console.log(cell);
                  return (
                    <td {...cell.getCellProps()}>
                      <div className={cell.column.id} data-value={cell.value}>
                        {cell.render("Cell")}
                      </div>
                    </td>
                  );
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
