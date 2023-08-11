import React, { FC, ReactNode } from "react";
import { useFocused, useSelected } from "slate-react";

import "./index.scss";

const baseClass = "br";

const Element: FC<{
  attributes: Record<string, any>[];
  children: ReactNode;
}> = ({ attributes, children }) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div
      className={[baseClass, selected && focused && `${baseClass}--selected`]
        .filter(Boolean)
        .join(" ")}
      contentEditable={false}
      {...attributes}
    >
      <div className={`${baseClass}__wrap`}>
        <div className={`${baseClass}__label`}>Spacer</div>
      </div>
      {children}
    </div>
  );
};

export default Element;
