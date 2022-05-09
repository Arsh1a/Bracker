/* eslint-disable react/jsx-key */
import React from "react";
import styled from "styled-components";
import { useTable, TableOptions, Column } from "react-table";

const Wrapper = styled.div``;

interface Props {
  data: any[];
}

type Cols = { title: string; status: string; severity: string; reporter: string; assignee: string };

const Table = ({ data }: Props) => {
  const columns: Column<Cols>[] = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Severity",
        accessor: "severity",
      },
      {
        Header: "Reporter",
        accessor: "reporter",
      },
      {
        Header: "Assignee",
        accessor: "assignee",
      },
    ],
    []
  );

  const options: TableOptions<Cols> = {
    data,
    columns,
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(options);

  return (
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
  );
};
export default Table;
