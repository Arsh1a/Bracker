import React from "react";
import { BsCheck2Circle, BsListUl, BsPerson, BsXCircle } from "react-icons/bs";
import styled from "styled-components";
import ContentWrapper from "../../Common/ContentWrapper";

const Wrapper = styled(ContentWrapper)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  gap: 40px;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProjectInfoText = styled.div`
  flex: 1 1 150px;
  display: flex;
  gap: 10px;
  p {
    font-weight: 800;
  }
  svg {
    font-size: 2rem;
    margin-top: 5px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

interface Props {
  ticketStats: {
    totalTickets: number;
    openTickets: number;
    closedTickets: number;
    inProgressTickets: number;
  };
  totalMembers: number;
}

const ProjectInfo = ({ ticketStats, totalMembers }: Props) => {
  return (
    <Wrapper>
      <ProjectInfoText>
        <BsPerson />
        <div>
          <h1>{totalMembers}</h1>
          <p>Members</p>
        </div>
      </ProjectInfoText>
      <ProjectInfoText>
        <BsListUl />
        <div>
          <h1>{ticketStats.totalTickets}</h1>
          <p>Total tickets</p>
        </div>
      </ProjectInfoText>
      <ProjectInfoText>
        <BsCheck2Circle />
        <div>
          <h1>{ticketStats.openTickets}</h1>
          <p>Open tickets</p>
        </div>
      </ProjectInfoText>
      <ProjectInfoText>
        <BsXCircle />
        <div>
          <h1>{ticketStats.closedTickets}</h1>
          <p>Closed tickets</p>
        </div>
      </ProjectInfoText>
    </Wrapper>
  );
};
export default ProjectInfo;
