import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../../components/Table";
import axios from "axios";
import { Column } from "react-table";

const Wrapper = styled.div``;

interface Props {
  projectID: string;
}

type Cols = { title: string; status: string; severity: string; reporter: string; assignee: string };

const TasksTable = ({ projectID }: Props) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

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
    axios.get(API_URL + `/task/${projectID}?limit=3`, { withCredentials: true }).then((res) => {
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
      setTotalTasks(res.data.totalTasks);
    });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + `/task/${projectID}?page=${currentPage}&limit=3`, { withCredentials: true })
      .then((res) => {
        setTasks(res.data.tasks);
      });
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage >= totalPages) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Wrapper>
      {tasks && (
        <Table
          handlePageSelect={handlePageSelect}
          data={tasks}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          columns={columns}
        />
      )}
    </Wrapper>
  );
};
export default TasksTable;
