import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../Common/Modal";
import { TicketType } from "../../../types/TicketType";
import Input from "../../Common/Input";
import Select from "../../Common/Select";
import ProjectMembersSelect from "../../Common/ProjectMembersSelect";
import { getProjectMembers } from "../../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import Tiptap from "../../Common/Tiptap";
import Button from "../../Common/Button";
import { reset, updateTicket } from "../../../features/slices/ticket/ticketSlice";
import ErrorMessage from "../../Common/ErrorMessage";
import Loading from "../../Common/Loading";
import { useAppDispatch } from "../../../lib/hooks";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const ModalHeader = styled.h3`
  margin-bottom: 20px;
`;

interface Props {
  data: TicketType;
  projectID: string;
  handleDataChange: (refreshed: boolean) => void;
  closeModal: () => void;
}

const EditTicketModal = ({ data, projectID, closeModal, handleDataChange }: Props) => {
  const [formData, setFormData] = useState<TicketType>(data);
  const [projectMembers, setProjectMembers] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state: RootState) => state.ticket
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProjectMembers(projectID).then((res) => {
      setProjectMembers(res.data);
    });
    setFormData({ ...formData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProjectMemberSelect = (data: any) => {
    setFormData({ ...formData, assignee: data });
  };

  const getContentFromTipTap = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    setFormData({ ...formData, content });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(updateTicket(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      handleDataChange(true);
      closeModal();
      dispatch(reset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Modal closeModal={closeModal}>
      <ModalHeader>Edit ticket</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            label="Title"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            label="Description"
            id="desc"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <Select
            label="Status"
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Inprogress">Inprogress</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <Select
            label="Severity"
            id="severity"
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <div className="select">
            <ProjectMembersSelect
              label="Assignee"
              id="assignee"
              data={projectMembers}
              selectValue={formData.assignee._id}
              hanldeOnChange={handleProjectMemberSelect}
              user={user}
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <Tiptap
            content={data.content}
            handleTipTap={getContentFromTipTap}
            label="Ticket details"
          />
        </InputWrapper>
        <Button
          disabled={isLoading}
          color={!isLoading ? "primary" : "light"}
          type="submit"
          height="40px"
        >
          {!isLoading ? "Edit" : <Loading color="dark" />}
        </Button>
        {isError && <ErrorMessage>{message}</ErrorMessage>}
      </Form>
    </Modal>
  );
};
export default EditTicketModal;
