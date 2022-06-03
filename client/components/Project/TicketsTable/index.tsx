import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../Common/Table";
import { Column } from "react-table";
import EditModal from "./EditTicketModal";
import { TicketType } from "../../../types/TicketType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { getTickets, reset } from "../../../features/slices/ticket/ticketSlice";
import Button from "../../Common/Button";
import TopFilters from "./TopFilters";
import { useAppDispatch } from "../../../lib/hooks";

const Wrapper = styled.div``;

const StyledTable = styled(Table)`
  [role="cell"] {
    width: 200px;
  }
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
    background-color: ${(props) => props.theme.colors.info};
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
    status: "Open" | "Closed" | "Inprogress" | "All";
    severity: "Low" | "Medium" | "High" | "All";
  }>({ page: 1, limit: 10, sort: "createdAt", order: "desc", status: "All", severity: "All" });

  const [modalData, setModalData] = useState<TicketType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isRefreshed, setIsRefreshed] = useState(false);

  const { page, limit, sort, order } = filters;

  const { isError, isLoading, isSuccess, message, ticketsData } = useSelector(
    (state: RootState) => state.ticket
  );

  const { tickets, totalPages, currentPage, totalTickets } = ticketsData;
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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

  const renderTimeColumn = (cellData: any) => {
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

  const renderTitleColumn = (cellData: any) => {
    if (cellData.length > 16) {
      return <>{cellData.substring(0, 16)}...</>;
    }

    return <>{cellData}</>;
  };

  return (
    <>
      <Wrapper>
        <TopFilters filters={filters} setFilters={setFilters} />
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
            { id: "title", content: renderTitleColumn },
            { id: "assignee", content: renderShowMemberColumn },
            {
              id: "reporter",
              content: renderShowMemberColumn,
            },
            {
              id: "createdAt",
              content: renderTimeColumn,
            },
          ]}
        />
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
