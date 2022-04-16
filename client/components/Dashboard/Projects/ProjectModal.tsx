import React, { useEffect } from "react";
import styled from "styled-components";
import Modal from "../../Common/Modal";
import Input from "../../Common/Input";
import Loading from "../../Common/Loading";
import Button from "../../Common/Button";
import { GrClose } from "react-icons/gr";
import MemberSearch from "./MemberSearch";
import { searchUsers } from "../../../lib/requestApi";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../../features/slices/project/projectSlice";
import { RootState } from "../../../features/store";
import { useRouter } from "next/router";

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

const CloseIcon = styled.div`
  position: absolute;
  font-size: 1.2rem;
  right: 0;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.5;
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

const ProjectModal = ({ setIsModalOpen }: Props) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [projectData, setProjectData] = React.useState({
    title: "",
    desc: "",
    members: [],
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.project);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3>Let&apos;s build a Project</h3>
            <form onSubmit={handleFirstStep}>
              <label htmlFor="project-title">Project name</label>
              <ModalInput
                placeholder="Company Co."
                required
                id="project-title"
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
              />
              <label htmlFor="project-desc">
                Description <span>(Optional)</span>
              </label>
              <ModalInput
                placeholder="We orginize everything here."
                id="project-desc"
                value={projectData.desc}
                onChange={(e) => setProjectData({ ...projectData, desc: e.target.value })}
              />
              <Button height="45px" padding="12px 0" type="submit" color="primary">
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
              <label htmlFor="member-name">
                Memeber&apos;s username <span>(Optional)</span>
              </label>
              <MemberSearch passDataToParent={handleMemberSearch} handleData={searchUsers} />
              <SecondStepButton
                disabled={isLoading}
                height="45px"
                padding="12px 0"
                type="submit"
                color="primary"
              >
                {isLoading ? <Loading color="dark" /> : "Create Project"}
              </SecondStepButton>
            </form>
          </>
        );
    }
  };

  const handleMemberSearch = (data: any) => {
    setProjectData({ ...projectData, members: data[0] });
  };

  const handleFirstStep = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(createProject(projectData));
    router.push("/dashboard/projects");
    setIsModalOpen(false);
    console.log(projectData);
  };

  return (
    <Modal>
      <ModalInnerWrapper>
        <CloseIcon onClick={() => setIsModalOpen(false)}>
          <GrClose />
        </CloseIcon>
        {renderStep()}
      </ModalInnerWrapper>
    </Modal>
  );
};
export default ProjectModal;
