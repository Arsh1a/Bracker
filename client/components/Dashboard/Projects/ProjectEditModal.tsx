import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateProject } from "../../../features/slices/project/projectSlice";
import { RootState } from "../../../features/store";
import { useAppDispatch } from "../../../lib/hooks";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import Loading from "../../Common/Loading";
import Modal from "../../Common/Modal";

const ModalInnerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    font-weight: 700;
    font-size: 0.8rem;
    margin-bottom: 5px;
    span {
      font-weight: 300;
      font-size: 0.8rem;
    }
  }
`;

const ModalInput = styled(Input)`
  margin-bottom: 30px;
`;

interface Props {
  closeModal: () => void;
  id: string;
  title: string;
  desc?: string;
}

const ProjectEditModal = ({ closeModal, id, title, desc }: Props) => {
  const [projectInfo, setProjectInfo] = React.useState({
    id,
    title,
    desc,
  });

  const dispatch = useAppDispatch();
  const { projects, isLoading } = useSelector((state: RootState) => state.project);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(updateProject(projectInfo));
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <ModalInnerWrapper>
        <h3>Edit project</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="project-title">Project title</label>
          <ModalInput
            placeholder="Project title"
            required
            id="project-title"
            value={projectInfo.title}
            onChange={(e) => setProjectInfo({ ...projectInfo, title: e.target.value })}
          />
          <label htmlFor="project-desc">Project title</label>
          <ModalInput
            placeholder="Project description"
            id="project-desc"
            value={projectInfo.desc}
            onChange={(e) => setProjectInfo({ ...projectInfo, desc: e.target.value })}
          />
          <Button color="primary" isLoading={isLoading} type="submit">
            Save
          </Button>
        </form>
      </ModalInnerWrapper>
    </Modal>
  );
};
export default ProjectEditModal;
