import React from "react";
import styled from "styled-components";
import Modal from "../../Common/Modal";
import Input from "../../Common/Input";
import Loading from "../../Common/Loading";
import Button from "../../Common/Button";
import MemberSearch from "../../Common/MemberSearch";
import { searchUsers } from "../../../lib/requestApi";
import { useSelector, useDispatch } from "react-redux";
import { createProject, inviteToProject } from "../../../features/slices/project/projectSlice";
import { RootState } from "../../../features/store";
import { useAppDispatch } from "../../../lib/hooks";

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

const SecondStepButton = styled(Button)`
  margin-top: 30px;
`;

interface Props {
  setIsModalOpen: (status: boolean) => void;
}

const ProjectCreateModal = ({ setIsModalOpen }: Props) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [projectData, setProjectData] = React.useState<{
    title: string;
    desc: string;
    ids: any;
  }>({
    title: "",
    desc: "",
    ids: [],
  });

  const dispatch = useAppDispatch();
  const { projects, isLoading } = useSelector((state: RootState) => state.project);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3>Let&apos;s build a Project</h3>
            <form onSubmit={handleFirstStep}>
              <ModalInput
                placeholder="Company Co."
                required
                label="Project Title"
                id="title"
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
              />
              <ModalInput
                placeholder="We orginize everything here."
                label={
                  <>
                    Description <span>(Optional)</span>
                  </>
                }
                id="desc"
                value={projectData.desc}
                onChange={(e) => setProjectData({ ...projectData, desc: e.target.value })}
              />
              <Button type="submit" color="primary">
                Continue
              </Button>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <h3>Invite your team</h3>
            <form onSubmit={handleSubmit}>
              <MemberSearch
                label={
                  <>
                    Memeber&apos;s username <span>(Optional)</span>
                  </>
                }
                id="member-search"
                passDataToParent={handleMemberSearch}
                handleData={searchUsers}
              />
              <SecondStepButton isLoading={isLoading} type="submit" color="primary">
                Create Project
              </SecondStepButton>
            </form>
          </>
        );
    }
  };

  const handleMemberSearch = (ids: string[]) => {
    setProjectData({ ...projectData, ids });
  };

  const handleFirstStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(createProject(projectData));
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const inviteData = {
      id: projects[projects.length - 1]._id, // Last project
      usersID: projectData.ids,
    };

    dispatch(inviteToProject(inviteData));
    setIsModalOpen(false);
  };

  return (
    <Modal closeModal={() => setIsModalOpen(false)}>
      <ModalInnerWrapper>{renderStep()}</ModalInnerWrapper>
    </Modal>
  );
};
export default ProjectCreateModal;
