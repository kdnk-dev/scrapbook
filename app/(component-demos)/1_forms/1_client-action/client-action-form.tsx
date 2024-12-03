"use client";

import React from "react";
import {
  KdFormField,
  KdInputField,
  kdnkForm,
  KdnkFormTypes,
  kdSimpleSubmitAction,
  KdSubmitButton,
  KFormData,
  KRenderProps,
} from "@kdnk.dev/forms";
import { z } from "zod";

const { Form, Schema } = kdnkForm({
  name: z.string().min(5),
  email: z.string().email(),
});

type SimpleFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(
    kdSimpleSubmitAction((formData: KFormData<SimpleFormT>) => {
      alert(
        `Thanks for filling out the form, ${formData.name}!\nYour email is: ${formData.email}`,
      );
    }),
  )
  .withChildComponent(FormContents);

function FormContents(renderProps: KRenderProps<SimpleFormT>) {
  return (
    <div className="f8w-space-y-2">
      <KdFormField
        name={"name"}
        label={"Your Name"}
        render={KdInputField("text", "Adam Smith")}
      />
      <KdFormField
        name={"email"}
        label={"Your Email"}
        render={KdInputField("text", "adam@smith.com")}
      />
      <KdSubmitButton>Submit</KdSubmitButton>
    </div>
  );
}
