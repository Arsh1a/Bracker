import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  background-color: white;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "12px")};
  ${(props) =>
    props.suggestedTagsExist &&
    `border-bottom-left-radius: 0;
     border-bottom-right-radius: 0;
     `}
  border: none;
  padding: 15px;
  width: 100%;
  transition: 0.3s;
  outline: 1px solid ${(props) => props.theme.colors.light};
  &:focus-within {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
  z-index: 10;
`;

const Tag = styled.div`
  background-color: #efefef;
  color: ${(props) => props.theme.colors.primary};
  padding: 5px 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  svg {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
`;

const SuggestionsDropDown = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.light};
`;

const SuggestionDropDownItem = styled.li<SuggestionDropDownItemProps>`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  ${(props) => props.userAlreadyAdded && `cursor: not-allowed;`}
  span {
    font-size: 0.8rem;
    margin-left: 10px;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.light};
  }
`;

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  handleData: (username: string) => any;
  passDataToParent: (data: any) => any;
  borderRadius?: string;
}

interface WrapperProps {
  borderRadius?: string;
  suggestedTagsExist?: boolean;
}

interface SuggestionDropDownItemProps {
  userAlreadyAdded: boolean;
}

const MemberSearch = ({ handleData, passDataToParent, borderRadius, ...rest }: Props) => {
  const [tags, setTags] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const response = await handleData(inputValue);
      setSuggestedTags(response.data);
    };
    if (inputValue.length >= 3) {
      fetchData();
    } else {
      setSuggestedTags([]);
    }
  }, [handleData, inputValue]);

  useEffect(() => {
    passDataToParent([tags]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const handleOnTagClick = (tag: string) => {
    if (tags.includes(tag) || user.username === tag) return;
    setTags([...tags, tag]);
    setSuggestedTags([]);
    setInputValue("");
  };

  const handleDeleteItem = (tag: string) => {
    setTags(tags.filter((item) => item !== tag));
  };

  return (
    <>
      <Wrapper borderRadius={borderRadius} suggestedTagsExist={suggestedTags.length > 0}>
        {tags.map((tag) => (
          <Tag key={tag}>
            {tag} <GrClose onClick={() => handleDeleteItem(tag)} />
          </Tag>
        ))}
        <Input
          placeholder="Type person's username"
          {...rest}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Wrapper>
      {suggestedTags.length > 0 && (
        <SuggestionsDropDown>
          {suggestedTags.map((tag: any) => (
            <SuggestionDropDownItem
              userAlreadyAdded={tags.includes(tag.username) || user.username === tag.username}
              key={tag._id}
              onClick={() => handleOnTagClick(tag.username)}
            >
              {tag.username}
              {user.username === tag.username && <span>(You)</span>}
            </SuggestionDropDownItem>
          ))}
        </SuggestionsDropDown>
      )}
    </>
  );
};
export default MemberSearch;
