"use client";

import React from "react";
import {
  kdDummySubmitAction,
  KdFormField,
  KdInputField,
  kdnkForm,
  KdnkFormTypes,
  KdSubmitButton,
  KRenderProps,
} from "@kdnk.dev/forms";
import { z } from "zod";

const { Form, Schema } = kdnkForm({
  username: z.string().min(5),
});

type SearchFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(kdDummySubmitAction<SearchFormT>("success-no-op"))
  .withChildComponent(FormContents);

function FormContents(renderProps: KRenderProps<SearchFormT>) {
  return (
    <div className="f8w-space-y-2">
      <KdFormField
        name={"username"}
        label={"Username to search for"}
        render={KdInputField("text", "AdamSmith")}
      />
      <KdSubmitButton>Search</KdSubmitButton>
    </div>
  );
}
