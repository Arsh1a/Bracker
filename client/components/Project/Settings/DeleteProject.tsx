import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteProject, reset } from "../../../features/slices/project/projectSlice";
import { RootState } from "../../../features/store";
import { useAppDispatch } from "../../../lib/hooks";
import Button from "../../Common/Button";
import ContentWrapper from "../../Common/ContentWrapper";
import Modal from "../../Common/Modal";

const StyledContentWrapper = styled(ContentWrapper)``;

const ModalButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

interface Props {
  data: any;
}

const DeleteProject = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state: RootState) => state.project
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = () => {
    setIsModalOpen(false);
    dispatch(deleteProject(data._id));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
    if (isSuccess && isModalOpen) {
      setIsModalOpen(false);
      router.push("/dashboard");
    }
  }, [isSuccess]);

  return (
    <StyledContentWrapper>
      <Button color="danger" onClick={() => setIsModalOpen(true)}>
        Delete Project
      </Button>
      {isModalOpen && (
        <Modal closeModal={() => setIsModalOpen(false)}>
          <h3>Are you sure you want to delete the project? 😔</h3>
          <ModalButtons>
            <Button isLoading={isLoading} color="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setIsModalOpen(false);
                dispatch(reset());
              }}
            >
              No, I was just looking around.
            </Button>
          </ModalButtons>
        </Modal>
      )}
    </StyledContentWrapper>
  );
};
export default DeleteProject;
