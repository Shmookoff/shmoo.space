import { ElementButton } from "payload/components/rich-text";
import { injectVoidElement } from "payload/dist/admin/components/forms/field-types/RichText/elements/injectVoid";
import { FC } from "react";
import { ReactEditor, useSlate } from "slate-react";
import Icon from "../Icon";
import { BaseEditor, Editor } from "slate";

const insertBr = (editor: ReactEditor) => {
  const markdownElement = {
    type: "br",
    children: [{ text: "" }],
  };

  injectVoidElement(editor, markdownElement);
  ReactEditor.focus(editor);
};

const ToolbarButton: FC<{ path: string }> = () => {
  const editor = useSlate() as ReactEditor;

  const onClick = () => {
    insertBr(editor);
  };

  return (
    <ElementButton format="br" onClick={onClick}>
      <Icon />
    </ElementButton>
  );
};

export default ToolbarButton;
