"use client";

import React from "react";
import {
  KdEditableViewModeOnly,
  KdEditModeOnly,
  KdFormField,
  KdInputField,
  kdnkForm,
  KdnkFormTypes,
  KdSubmitButton,
  KRenderProps,
} from "@kdnk.dev/forms";
import { z } from "zod";
import { createOrUpdateFruit } from "@/app/(component-demos)/1_forms/4~create-&-edit-records/actions";
import { Button } from "@/components/ui/button";

const { Form, Schema } = kdnkForm({
  entry_id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  type_of_fruit: z.string().min(1),
  country_of_origin: z.string().min(1),
  count: z.number({ coerce: true }),
});

export type FruitFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(createOrUpdateFruit)
  .withChildComponent(FormContents);

function FormContents({ startEdit }: KRenderProps<FruitFormT>) {
  return (
    <div className="f8w-space-y-2">
      <KdFormField
        name={"type_of_fruit"}
        label={"Type of Fruit"}
        renderField={KdInputField("text", "Banana")}
      />
      <KdFormField
        name={"country_of_origin"}
        label={"Country of Origin"}
        renderField={KdInputField("text", "Taiwan")}
      />
      <KdFormField
        name={"count"}
        label={"Count"}
        renderField={KdInputField("number", "100")}
      />
      <KdEditableViewModeOnly>
        <Button className={"f8w-w-24"} onClick={() => startEdit()}>
          Edit
        </Button>
      </KdEditableViewModeOnly>
      <KdEditModeOnly>
        <KdSubmitButton className={"f8w-w-24"}>Save</KdSubmitButton>
      </KdEditModeOnly>
    </div>
  );
}
