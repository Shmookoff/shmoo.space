"use client";

import React, { useEffect } from "react";
import { useField, TextInput, useFormFields } from "payload/components/forms";
import { useDocumentInfo } from "payload/components/utilities";
import _ from "lodash";

type Props = { path: string };

const SlugField: React.FC<Props> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const { id } = useDocumentInfo();

  const title = useFormFields(([fields]) => fields.title);

  useEffect(() => {
    if (!id) {
      const slug = _.kebabCase(title.value as string | undefined);
      setValue(slug);
    }
  }, [id, title, setValue]);

  return (
    <div>
      <span>
        <TextInput
          path={path}
          name="slug"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="Slug"
        />
      </span>
    </div>
  );
};

export default SlugField;
