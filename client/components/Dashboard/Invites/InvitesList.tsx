import React from "react";
import styled from "styled-components";
import InviteCard from "./InviteCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface Props {
  data: any[];
}

const InvitesList = ({ data }: Props) => {
  return (
    <Wrapper>
      {data &&
        data.map((invite) => (
          <InviteCard
            key={invite._id}
            id={invite._id}
            invitedByUsername={invite.invitedByUsername}
            projectName={invite.projectName}
          />
        ))}
    </Wrapper>
  );
};
export default InvitesList;
