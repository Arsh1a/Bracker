import React from "react";
import styled from "styled-components";
import Select from "../../Common/Select";

const Wrapper = styled.div``;

interface Props {
  id?: string;
  data: any[];
  selectValue: string;
  hanldeOnChange: (e: any) => void;
  user: any;
}

const ProjectMembersSelect = ({ id, data, selectValue, hanldeOnChange, user }: Props) => {
  return (
    <Select required id={id} value={selectValue} onChange={(e) => hanldeOnChange(e.target.value)}>
      {data &&
        data.map((member: { _id: string; username: string }) => {
          return (
            <option key={member._id} value={member._id}>
              {member.username} {member.username === user.username ? "(You)" : ""}
            </option>
          );
        })}
    </Select>
  );
};
export default ProjectMembersSelect;
