"use client";

import React from "react";
import {
  KdBooleanRadioGroup,
  KdCheckBox,
  KdCheckBoxGroup,
  kdDummySubmitAction,
  KdFormField,
  KdInputField,
  kdnkForm,
  KdnkFormTypes,
  KdRadioGroup,
  KdSelectField,
  KdTextArray,
  KRenderProps,
} from "@kdnk.dev/forms";
import { z } from "zod";

const { Form, Schema } = kdnkForm({
  text: z.string(),
  date: z.string().date(),
  select: z.string(),
  radio: z.string(),
  booleanRadio: z.boolean(),
  checkbox: z.boolean(),
  checkboxGroup: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  textArray: z.array(z.string()),
});

type SimpleFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(kdDummySubmitAction("success-no-op"))
  .withChildComponent(FormContents);

function FormContents(renderProps: KRenderProps<SimpleFormT>) {
  return (
    <div className="f8w-space-y-10">
      <div>
        <KdFormField
          name={"text"}
          label={"Text Field"}
          renderField={KdInputField("text", "")}
        />
        <div className="f8w-font-mono f8w-pl-8">
          Value: {renderProps.form.watch("text") ?? "< not set >"}
        </div>
      </div>
      <div>
        <KdFormField
          name={"date"}
          label={"Date Field"}
          renderField={KdInputField("date", new Date().toDateString())}
        />
        <div className="f8w-font-mono f8w-pl-8">
          Value: {renderProps.form.watch("date") ?? "< not set >"}
        </div>
      </div>
      <div>
        <KdFormField
          name={"select"}
          label={"Select Field"}
          renderField={KdSelectField(
            {
              cats: "Cats",
              dogs: "Dogs",
              birds: "Birds",
            },
            "Select a category...",
          )}
        />
        <div className="f8w-font-mono f8w-pl-8">
          Value: {renderProps.form.watch("select") ?? "< not set >"}
        </div>
      </div>
      <div>
        <KdFormField
          name={"radio"}
          label={"Radio Group"}
          renderField={KdRadioGroup({
            cats: "Cats",
            dogs: "Dogs",
            birds: "Birds",
          })}
        />
        <div className="f8w-font-mono f8w-pl-8">
          Value: {renderProps.form.watch("radio") ?? "< not set >"}
        </div>
      </div>
      <div>
        <KdFormField
          name={"booleanRadio"}
          label={"Boolean Radio Group"}
          renderField={KdBooleanRadioGroup("Yes!", "No!")}
        />
        <div className="f8w-font-mono f8w-pl-8">
          {renderProps.form.watch("booleanRadio") != undefined
            ? String(renderProps.form.watch("booleanRadio"))
            : "< not set >"}
        </div>
      </div>
      <div>
        <KdFormField
          name={"checkbox"}
          label={"CheckBox"}
          renderField={KdCheckBox("I want a cat please")}
        />
        <div className="f8w-font-mono f8w-pl-8">
          Value:{" "}
          {renderProps.form.watch("checkbox") != undefined
            ? String(renderProps.form.watch("checkbox"))
            : "< not set >"}
        </div>
      </div>
      <div>
        <KdFormField
          name={"checkboxGroup"}
          label={"CheckBox Group"}
          renderField={KdCheckBoxGroup({
            cats: "Cats",
            dogs: "Dogs",
            birds: "Birds",
          })}
        />
        <div className="f8w-font-mono f8w-pl-8">
          Value:{" "}
          {JSON.stringify(renderProps.form.watch("checkboxGroup")) ??
            "< not set >"}
        </div>
      </div>
      <div>
        <KdFormField
          name={"textArray"}
          label={"Input Array"}
          renderField={KdTextArray("Enter new item")}
        />
        <div className="f8w-font-mono f8w-pl-8">
          {JSON.stringify(renderProps.form.watch("textArray")) ?? "< not set >"}
        </div>
      </div>
    </div>
  );
}
