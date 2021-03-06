import React from "react";
import styled from "styled-components";
import Button from "../../Common/Button";
import { useDispatch } from "react-redux";
import { handleInvite } from "../../../features/slices/invite/inviteSlice";
import { useAppDispatch } from "../../../lib/hooks";
import ContentWrapper from "../../Common/ContentWrapper";

const Wrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  b {
    font-size: 1.1rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 20px;
`;

interface Props {
  invitedByUsername: string;
  projectName: string;
  id: string;
}

const InviteCard = ({ projectName, invitedByUsername, id }: Props) => {
  const dispatch = useAppDispatch();

  const handleAccept = () => {
    dispatch(handleInvite({ id, accepted: true }));
  };

  const handleDecline = () => {
    dispatch(handleInvite({ id, accepted: false }));
  };

  return (
    <Wrapper>
      <p>
        You&apos;ve been invited to <b>{projectName}</b> by <b>{invitedByUsername}</b>.
      </p>
      <Actions>
        <Button color="success" onClick={handleAccept}>
          Accept
        </Button>
        <Button color="danger" onClick={handleDecline}>
          Decline
        </Button>
      </Actions>
    </Wrapper>
  );
};
export default InviteCard;
