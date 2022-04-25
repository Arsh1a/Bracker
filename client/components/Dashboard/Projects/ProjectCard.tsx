import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProjectEditModal from "./ProjectEditModal";
import DropDown from "../../Common/DropDown";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../features/slices/project/projectSlice";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 400px;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid ${(props) => props.theme.colors.light};
  justify-content: space-between;
  svg {
    position: relative;
    top: 2px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
  .delete {
    color: red;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface Props {
  id: string;
  title: string;
  description?: string;
}

const ProjectCard = ({ title, description, id }: Props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const dropDownRef = useRef<HTMLUListElement>(null);
  const dotIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target) &&
      dotIconRef.current &&
      !dotIconRef.current.contains(event.target)
    ) {
      setIsDropDownOpen(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteProject(id));
  };

  return (
    <Wrapper>
      <Info>
        <h3>{title}</h3>
        <p>{description}</p>
      </Info>
      <div ref={dotIconRef}>
        <BsThreeDotsVertical onClick={() => setIsDropDownOpen(!isDropDownOpen)} />
      </div>
      {isModalOpen && (
        <ProjectEditModal
          id={id}
          title={title}
          desc={description}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      {isDropDownOpen && (
        <DropDown ref={dropDownRef}>
          <li
            onClick={() => {
              setIsModalOpen(true);
              setIsDropDownOpen(false);
            }}
          >
            Edit
          </li>
          <li className="delete" onClick={() => handleDelete()}>
            Delete
          </li>
        </DropDown>
      )}
    </Wrapper>
  );
};
export default ProjectCard;
