import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../Common/Table";
import axios from "axios";
import { Column } from "react-table";

const Wrapper = styled.div``;

const StyledTable = styled(Table)`
  .status {
    color: white;
    padding: 4px 15px;
    text-align: center;
    border-radius: 20px;
    display: inline;
  }
  [data-value="Open"] {
    background-color: ${(props) => props.theme.colors.primary};
  }
  [data-value="Closed"] {
    background-color: ${(props) => props.theme.colors.danger};
  }
  [data-value="Inprogress"] {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

interface Props {
  projectID: string;
}

type Cols = { title: string; status: string; severity: string; reporter: string; assignee: string };

const TicketsTable = ({ projectID }: Props) => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    sort: string;
    order: "desc" | "asc";
  }>({ page: 1, limit: 5, sort: "createdAt", order: "desc" });
  const { page, limit, sort, order } = filters;

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

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  useEffect(() => {
    axios
      .get(
        API_URL + `/ticket/${projectID}?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTickets(res.data.tickets);
        setTotalPages(res.data.totalPages);
        setTotalTickets(res.data.totalTickets);
      });
  }, [API_URL, filters, limit, order, page, projectID, sort]);

  const handleNext = () => {
    if (page >= totalPages) {
      return;
    }

    setFilters({ ...filters, page: page + 1 });
  };

  const handlePrevious = () => {
    if (page === 1) {
      return;
    }

    setFilters({ ...filters, page: page - 1 });
  };

  const handlePageSelect = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleSort = (id: string) => {
    if (sort === id) {
      setFilters({ ...filters, order: order === "desc" ? "asc" : "desc" });
    } else {
      setFilters({ ...filters, sort: id, order: "desc" });
    }
  };
  return (
    <Wrapper>
      {tickets && (
        <StyledTable
          handlePageSelect={handlePageSelect}
          data={tickets}
          totalPages={totalPages}
          currentPage={page}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleSort={handleSort}
          columns={columns}
          sort={sort}
          order={order}
        />
      )}
    </Wrapper>
  );
};
export default TicketsTable;
