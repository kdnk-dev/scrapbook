"use client";

import React from "react";
import {
  KdFormField,
  KdInputField,
  kdnkForm,
  KdnkFormTypes,
  KRenderProps,
} from "@kdnk.dev/forms";
import { z } from "zod";
import { upperCaseServerAction } from "@/app/(component-demos)/1_forms/arrays/actions";

const { Form, Schema } = kdnkForm({
  name: z.string().min(5),
  email: z.string().email(),
});

export type SimpleFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(upperCaseServerAction)
  .withChildComponent(FormContents);

function FormContents(renderProps: KRenderProps<SimpleFormT>) {
  return (
    <div className="f8w-space-y-2">
      <KdFormField
        name={"name"}
        label={"Name"}
        render={KdInputField("text", "Adam Smith")}
      />
      <KdFormField
        name={"email"}
        label={"Email"}
        render={KdInputField("text", "adam@smith.com")}
      />
    </div>
  );
}
