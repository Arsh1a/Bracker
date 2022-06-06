import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../components/Common/Button";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import Input from "../../../components/Common/Input";
import Loading from "../../../components/Common/Loading";
import Select from "../../../components/Common/Select";
import Tiptap from "../../../components/Common/Tiptap";
import ProjectMembersSelect from "../../Common/ProjectMembersSelect";
import { createTicket, reset } from "../../../features/slices/ticket/ticketSlice";
import { RootState } from "../../../features/store";
import { getProjectMembers } from "../../../lib/requestApi";
import { useAppDispatch } from "../../../lib/hooks";
import ContentWrapper from "../../Common/ContentWrapper";

const Wrapper = styled(ContentWrapper)`
  display: flex;
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
`;

const InputWrapper = styled.div``;

interface Props {
  projectData: any;
}

const CreateTicketForm = ({ projectData }: Props) => {
  const { _id } = projectData;

  const [projectMembers, setProjectMembers] = useState<string[]>([]);
  const [form, setForm] = useState<{
    title: string;
    desc: string;
    severity: "Low" | "Medium" | "High";
    assignee: string;
    content: string;
  }>({ title: "", desc: "", severity: "Low", assignee: "", content: "" });

  // Have to use separate state for content because cant spread form if setForm directly used in TipTap (weird)
  const [content, setContent] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state: RootState) => state.ticket
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const getContentFromTipTap = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    setForm({ ...form, content });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      createTicket({
        projectID: _id,
        title: form.title,
        desc: form.desc,
        status: "Open",
        severity: form.severity,
        assignee: form.assignee,
        content: form.content,
        reporter: user._id,
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/p/${_id}`);
    }
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleProjectMemberSelect = (data: string) => {
    setForm({ ...form, assignee: data });
  };

  useEffect(() => {
    getProjectMembers(_id).then((res) => {
      setProjectMembers(res.data);
    });
    setForm({ ...form, assignee: user._id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            label="Title"
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            label="Description"
            id="desc"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <div className="select">
            <Select
              required
              label="Severity"
              id="severity"
              value={form.severity}
              onChange={(e) =>
                setForm({ ...form, severity: e.target.value as "Low" | "Medium" | "High" })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </div>
        </InputWrapper>
        <InputWrapper>
          <div className="select">
            <ProjectMembersSelect
              label="Assignee"
              id="assignee"
              data={projectMembers}
              selectValue={form.assignee}
              hanldeOnChange={handleProjectMemberSelect}
              user={user}
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <Tiptap label={"Ticket details"} handleTipTap={getContentFromTipTap} />
        </InputWrapper>
        <Button isLoading={isLoading} color="primary" type="submit">
          Create Ticket
        </Button>
        {isError && <ErrorMessage>{message}</ErrorMessage>}
      </form>
    </Wrapper>
  );
};
export default CreateTicketForm;
