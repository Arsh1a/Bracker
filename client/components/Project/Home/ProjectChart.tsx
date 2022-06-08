import React from "react";
import styled from "styled-components";
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ContentWrapper from "../../Common/ContentWrapper";

const Wrapper = styled(ContentWrapper)``;

interface Props {
  ticketStats: {
    totalTickets: number;
    openTickets: number;
    closedTickets: number;
    inProgressTickets: number;
  };
}

const COLORS = ["#9C9C9C", "#2b8aff", "#EB5A46", "#edba00"];

const ProjectChart = ({ ticketStats }: Props) => {
  const chartData = [
    { name: "Total Tickets", value: ticketStats.totalTickets },
    { name: "Open Tickets", value: ticketStats.openTickets },
    { name: "Closed Tickets", value: ticketStats.closedTickets },
    { name: "Inprogress Tickets", value: ticketStats.inProgressTickets },
  ];

  return (
    <Wrapper>
      <h2>Tickets</h2>
      <PieChart width={500} height={270}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={(entry) => entry.name}
          isAnimationActive={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Wrapper>
  );
};
export default ProjectChart;
