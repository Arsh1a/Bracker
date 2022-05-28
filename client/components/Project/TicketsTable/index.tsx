import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../Common/Table";
import axios from "axios";
import { Column } from "react-table";
import EditModal from "./EditTicketModal";
import { TicketType } from "../../../types/TicketType";
import { getTicketsForTable } from "../../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { getTickets } from "../../../features/slices/ticket/ticketSlice";

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

const TicketsTable = ({ projectID }: Props) => {
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    sort: string;
    order: "desc" | "asc";
  }>({ page: 1, limit: 5, sort: "createdAt", order: "desc" });

  const [modalData, setModalData] = useState<TicketType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isRefreshed, setIsRefreshed] = useState(false);

  const { page, limit, sort, order } = filters;

  const { isError, isLoading, isSuccess, message, ticketsData } = useSelector(
    (state: RootState) => state.ticket
  );

  const { tickets, totalPages, currentPage, totalTickets } = ticketsData;
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getTickets({ projectID, ...filters }));
    setIsRefreshed(false);
  }, [filters, projectID, isRefreshed, dispatch]);

  useEffect(() => {});

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

  const renderShowMemberColumn = (cellData: any) => {
    return <>{cellData.username}</>;
  };

  const renderTime = (cellData: any) => {
    var d = new Date(cellData);
    return (
      <>
        {d.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })}
      </>
    );
  };

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
            isLoading={isLoading}
            customCell={[
              { id: "assignee", content: renderShowMemberColumn },
              {
                id: "reporter",
                content: renderShowMemberColumn,
              },
              {
                id: "createdAt",
                content: renderTime,
              },
            ]}
          />
        )}
      </Wrapper>
      {isModalOpen && (
        <EditModal
          projectID={projectID}
          data={modalData!}
          closeModal={() => setIsModalOpen(false)}
          handleDataChange={setIsRefreshed}
        />
      )}
    </>
  );
};
export default TicketsTable;
