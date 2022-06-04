/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useTable, usePagination, TableOptions, Column } from "react-table";
import Pagination from "./Pagination";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Loading from "../Loading";

const Wrapper = styled.div`
  position: relative;
`;

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
    padding: 15px 25px;
  }
  tr {
    border-bottom: 1px solid ${(props) => props.theme.colors.light};
    //This fixes the bug that some borders are bolder than others
    border-width: 0.01px;
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

const LoadingOverlay = styled.div`
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: #ffffffb7;
  position: absolute;
  border-radius: 10px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
  handleDataClick?: (data: any) => void;
  customCell?: { id: string; content: (cellData: any) => React.ReactNode }[];
  isLoading: boolean;
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
  handleDataClick,
  customCell,
  isLoading,
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
      <Wrapper>
        {(isLoading || data.length === 0) && (
          <LoadingOverlay>
            <div>
              <Loading color="dark" />
            </div>
          </LoadingOverlay>
        )}
        <StyledTable
          style={{ minHeight: data.length === 0 ? "300px" : "unset" }}
          {...getTableProps()}
          {...rest}
        >
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
                <tr
                  onClick={handleDataClick && (() => handleDataClick(row.original))}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    // If we want to have a custom cell
                    if (customCell) {
                      for (let i = 0; i < customCell.length; i++) {
                        if (customCell[i].id === cell.column.id) {
                          return (
                            <td {...cell.getCellProps()}>{customCell[i].content(cell.value)}</td>
                          );
                        }
                      }
                    }
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
      </Wrapper>
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
