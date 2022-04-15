import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  background-color: white;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "12px")};
  border: none;
  padding: 15px;
  width: 100%;
  transition: 0.3s;
  outline: 1px solid ${(props) => props.theme.colors.light};
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const Tag = styled.div`
  background-color: red;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
`;

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  borderRadius?: string;
}

interface WrapperProps {
  borderRadius?: string;
}

const TagsInput = ({ borderRadius, ...rest }: Props) => {
  const [tags, setTags] = useState([]);
  return (
    <Wrapper borderRadius={borderRadius}>
      <Tag>S</Tag>
      <Input {...rest} />
    </Wrapper>
  );
};
export default TagsInput;
