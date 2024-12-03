"use client";

import {
  KdEditableViewModeOnly,
  KdEditModeOnly,
  kdnkDynamicForm,
  KdSubmitButton,
  KFormProps,
} from "@kdnk.dev/forms";
import { dynamicFormUpsertActionProxy } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/actions";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { formConfig } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/form-schema";

export function AnimalDynamicForm(props: KFormProps<any>) {
  // Can't re-use the Form object because the context is not properly propagated and is passed manually instead.
  const { DynamicFormComponent, DynamicFormContents, Schema } = useMemo(
    () =>
      kdnkDynamicForm(formConfig).withSubmitAction((formData) =>
        dynamicFormUpsertActionProxy("animals", "entry_id", formData),
      ),
    [],
  );

  return (
    <DynamicFormComponent
      {...props}
      content={(renderProps) => (
        <>
          <DynamicFormContents {...renderProps} />
          <KdEditableViewModeOnly>
            <Button onClick={() => renderProps.startEdit()}>Edit</Button>
          </KdEditableViewModeOnly>
          <KdEditModeOnly>
            <KdSubmitButton>Save</KdSubmitButton>
          </KdEditModeOnly>
        </>
      )}
    />
  );
}
