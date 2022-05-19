import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../../components/Common/Button";
import Container from "../../../components/Common/Container";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import Input from "../../../components/Common/Input";
import Loading from "../../../components/Common/Loading";
import Select from "../../../components/Common/Select";
import Tiptap from "../../../components/Common/Tiptap";
import ProjectMembersSelect from "../../../components/Project/CreateIssue/ProjectMembersSelect";
import { createIssue } from "../../../features/slices/issue/issueSlice";
import { RootState } from "../../../features/store";
import { getProjectMembers, getProjectSession } from "../../../lib/requestApi";

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  background-color: white;
  box-shadow: rgb(10 19 23 / 5%) 0px 2px 8px 0px;
  padding: 40px;
  border-radius: 20px;
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    .select {
      margin-top: 10px;
    }
  }
`;

const IssueInput = styled(Input)`
  margin-top: 10px;
`;

interface Props {
  data: {
    project: any;
    success: boolean;
  };
}

const MyIssues = ({ data }: Props) => {
  const { _id, title, desc, members } = data.project;

  const [projectMembers, setProjectMembers] = useState<string[]>([]);
  const [form, setForm] = useState<{
    title: string;
    desc: string;
    severity: "low" | "medium" | "high";
    assignee: string;
    content: string;
  }>({ title: "", desc: "", severity: "low", assignee: "", content: "" });

  // Have to use separate state for content because cant spread form if setForm directly used in TipTap (weird)
  const [content, setContent] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.auth);
  const { isError, isLoading, message } = useSelector((state: RootState) => state.issue);
  const dispatch = useDispatch();
  const router = useRouter();

  const getContentFromTipTap = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    setForm({ ...form, content });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await dispatch(
      createIssue({
        projectID: _id,
        title: form.title,
        desc: form.desc,
        status: "open",
        severity: form.severity,
        assignee: form.assignee,
        content: form.content,
        reporter: user._id,
      })
    );
    router.push(`/p/${_id}`);
  };

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
    <Container flexDirection="column">
      <h1>Create Issue</h1>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="issue-title">Title</label>
            <IssueInput
              required
              type="text"
              id="issue-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="issue-desc">Description</label>
            <IssueInput
              id="issue-desc"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="issue-severity">Severity</label>
            <div className="select">
              <Select
                required
                id="issue-severity"
                value={form.severity}
                onChange={(e) =>
                  setForm({ ...form, severity: e.target.value as "low" | "medium" | "high" })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
          </div>
          <div>
            <label htmlFor="issue-assignee">Assignee</label>
            <div className="select">
              <ProjectMembersSelect
                id="issue-assigne"
                data={projectMembers}
                selectValue={form.assignee}
                hanldeOnChange={handleProjectMemberSelect}
                user={user}
              />
            </div>
          </div>
          <Tiptap handleTipTap={getContentFromTipTap} />
          <Button
            disabled={isLoading}
            color={!isLoading ? "primary" : "light"}
            type="submit"
            height="40px"
          >
            {!isLoading ? "Create Issue" : <Loading color="dark" />}
          </Button>
          {isError && <ErrorMessage>{message}</ErrorMessage>}
        </form>
      </Wrapper>
    </Container>
  );
};
export default MyIssues;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getProjectSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  return {
    props: {
      data: session.data,
    },
  };
};
