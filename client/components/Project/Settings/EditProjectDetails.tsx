import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import ContentWrapper from "../../../components/Common/ContentWrapper";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import { useAppDispatch } from "../../../lib/hooks";
import { reset, updateProject } from "../../../features/slices/project/projectSlice";
import ErrorMessage from "../../../components/Common/ErrorMessage";

const StyledContentWrapper = styled(ContentWrapper)`
  flex: 1;
  h2 {
    margin-bottom: 20px;
  }
  input {
    margin-bottom: 20px;
  }
`;

interface Props {
  data: any;
}

const EditProjectDetails = ({ data }: Props) => {
  const [formData, setFormData] = useState({
    id: data._id,
    title: data.title,
    desc: data.desc,
  });

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state: RootState) => state.project
  );

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateProject(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);

  return (
    <StyledContentWrapper>
      <h2>Edit Project Details</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Input
          label="Description"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        />
        <Button type="submit" color="primary" isLoading={isLoading}>
          Save
        </Button>
      </form>
    </StyledContentWrapper>
  );
};
export default EditProjectDetails;
