import React from "react";
import styled from "styled-components";
import Select from "./Select";

const Wrapper = styled.div``;

interface Props {
  id?: string;
  label?: string;
  data: any[];
  selectValue: string;
  hanldeOnChange: (e: any) => void;
  user: any;
}

const ProjectMembersSelect = ({ id, label, data, selectValue, hanldeOnChange, user }: Props) => {
  return (
    <Select
      label={label}
      required
      id={id}
      value={selectValue}
      onChange={(e) => hanldeOnChange(e.target.value)}
    >
      {data &&
        data.map((member: { _id: string; name: string }) => {
          return (
            <option key={member._id} value={member._id}>
              {member.name} {member.name === user?.name ? "(You)" : ""}
            </option>
          );
        })}
    </Select>
  );
};
export default ProjectMembersSelect;
