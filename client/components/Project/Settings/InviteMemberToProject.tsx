import React, { useState } from "react";
import styled from "styled-components";
import ContentWrapper from "../../Common/ContentWrapper";
import MemberSearch from "../../Common/MemberSearch";
import { searchUsers } from "../../../lib/requestApi";
import { useAppDispatch } from "../../../lib/hooks";
import { inviteToProject } from "../../../features/slices/project/projectSlice";
import Button from "../../Common/Button";

const StyledContentWrapper = styled(ContentWrapper)`
  display: flex;
  gap: 20px;
  flex-direction: column;
  flex: 1;
`;

interface Props {
  data: any;
}

const InviteMemberToProject = ({ data }: Props) => {
  const [members, setMembers] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const handleMemberSearch = (ids: string[]) => {
    setMembers(ids);
  };

  const handleSubmit = () => {
    dispatch(inviteToProject({ id: data._id, usersID: members }));
  };

  return (
    <StyledContentWrapper>
      <h2>Invite Member</h2>
      <div>
        <MemberSearch passDataToParent={handleMemberSearch} handleData={searchUsers} />
      </div>
      <div>
        <Button color="primary" onClick={handleSubmit}>
          Invite
        </Button>
      </div>
    </StyledContentWrapper>
  );
};
export default InviteMemberToProject;
