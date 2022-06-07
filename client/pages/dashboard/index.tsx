import React, { useEffect } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";

import { getSession } from "../../lib/requestApi";
import DashboardPagesLayout from "../../components/Common/DashboardPagesLayout";
import Button from "../../components/Common/Button";
import { getProjects, reset } from "../../features/slices/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useRouter } from "next/router";
import { GrGithub } from "react-icons/gr";
import { useAppDispatch } from "../../lib/hooks";
import ContentWrapper from "../../components/Common/ContentWrapper";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const WelcomeBox = styled(ContentWrapper)`
  flex: 3;
  h2 {
    margin-bottom: 10px;
  }
  p {
    margin-top: 3px;
    margin-bottom: 15px;
  }
  button {
    padding: 10px 25px;
    font-size: 1.2rem;
  }
`;

const SocialsBox = styled(ContentWrapper)`
  flex: 1.5;
  p {
    margin-top: 3px;
    margin-bottom: 20px;
  }
  a {
    color: inherit;
  }
  svg {
    font-size: 2rem;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 20px;
    &:hover {
      opacity: 0.6;
    }
  }
`;

interface Props {
  data: any;
}

const Profile = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const { projects, isLoading, isError, message, isSuccess } = useSelector(
    (state: RootState) => state.project
  );

  const router = useRouter();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);

  const { username } = data;

  return (
    <DashboardPagesLayout headerContent={<h1>Hello {username}</h1>}>
      <Wrapper>
        {projects.length > 0 ? (
          <WelcomeBox>
            <h2>Welcome back!</h2>
            <Button onClick={() => router.push("/dashboard/projects")} color="primary">
              Go to Projects
            </Button>
          </WelcomeBox>
        ) : (
          <WelcomeBox>
            <h2>Welcome to Bracker!</h2>
            <p>Get started by creating your first project.</p>
            <Button onClick={() => router.push("/dashboard/projects")} color="primary">
              Create Project
            </Button>
          </WelcomeBox>
        )}
        <SocialsBox>
          <h2>Contribute to Bracker</h2>
          <p>Bracker is an open-source project which you can help improve by contributing.</p>
          <a href="https://github.com/Arsh1a/Bracker" target="_blank" rel="noreferrer">
            <GrGithub />
          </a>
        </SocialsBox>
      </Wrapper>
    </DashboardPagesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  return {
    props: { data: session.data },
  };
};

export default Profile;
