import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../Common/Table";
import axios from "axios";
import { Column } from "react-table";
import EditModal from "./EditModal";
import { TicketType } from "../../../types/TicketType";

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
  tr {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
`;

interface Props {
  projectID: string;
}

interface Cols extends TicketType {}

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

  const [modalData, setModalData] = useState<TicketType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { page, limit, sort, order } = filters;

  const columns: Column<TicketType>[] = React.useMemo(
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
      {
        Header: "Created At",
        accessor: "createdAt",
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

  const handleDataClick = (modalData: TicketType) => {
    setModalData(modalData);
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  return (
    <>
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
            handleDataClick={handleDataClick}
          />
        )}
      </Wrapper>
      {isModalOpen && <EditModal data={modalData!} closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};
export default TicketsTable;
