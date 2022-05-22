import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BsJustify,
  BsJustifyLeft,
  BsJustifyRight,
  BsListOl,
  BsListUl,
  BsParagraph,
  BsTextCenter,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from "react-icons/bs";
import { BiCodeBlock } from "react-icons/bi";
import { VscHorizontalRule } from "react-icons/vsc";
import { GrBlockQuote } from "react-icons/gr";
import styled from "styled-components";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import lowlight from "lowlight";

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.light};
  border-radius: 12px;
`;

const StyledEditor = styled(EditorContent)`
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.light};
  width: 100%;
  .ProseMirror {
    outline: none;
    min-height: 200px;

    blockquote {
      border-left: 3px solid ${(props) => props.theme.colors.light};
      padding-left: 0.8rem;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
      margin-inline-start: 20px;
      margin-inline-end: 20px;
    }

    pre {
      background: #0d0d0d;
      border-radius: 0.5rem;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;

      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }

      .hljs-comment,
      .hljs-quote {
        color: #616161;
      }

      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f98181;
      }

      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #fbbc88;
      }

      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #b9f18d;
      }

      .hljs-title,
      .hljs-section {
        color: #faf594;
      }

      .hljs-keyword,
      .hljs-selector-tag {
        color: #70cff8;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: 700;
      }
    }
  }
`;

const CommandsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  input {
    border-color: ${(props) => props.theme.colors.light};
    border-radius: 4px;
    background-color: transparent;
  }
  button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 4px;
  }
  button,
  select {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
  .is-active {
    background-color: ${(props) => props.theme.colors.lightPrimary};
  }
`;

interface Props {
  handleTipTap: (content: string) => void;
}

const Tiptap = ({ handleTipTap }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      handleTipTap(content);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Wrapper>
      <CommandsWrapper>
        <input
          type="color"
          onInput={(e) =>
            editor
              .chain()
              .focus()
              .setColor((e.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes("textStyle").color}
        />
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <BsTypeBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <BsTypeItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <BsTypeStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <BsTypeUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <BsJustifyLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        >
          <BsTextCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <BsJustifyRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
        >
          <BsJustify />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <BsParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        >
          h4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
        >
          h5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
        >
          h6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <BsListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <BsListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <BiCodeBlock />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <GrBlockQuote />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <VscHorizontalRule />
        </button>
      </CommandsWrapper>
      <StyledEditor editor={editor} />
    </Wrapper>
  );
};

export default Tiptap;
