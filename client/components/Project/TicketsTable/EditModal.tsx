import React from "react";
import styled from "styled-components";
import Modal from "../../Common/Modal";
import { TicketType } from "../../../types/TicketType";

interface Props {
  data: TicketType;
  closeModal: () => void;
}

const EditModal = ({ data, closeModal }: Props) => {
  return <Modal closeModal={closeModal}>{data.title}</Modal>;
};
export default EditModal;
