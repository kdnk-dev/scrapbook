"use client";

import {
  KdEditableViewModeOnly,
  KdEditModeOnly,
  kdnkDynamicForm,
  KdSubmitButton,
  KFormProps,
} from "@kdnk.dev/forms";
import { dynamicFormUpsertActionProxy } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/actions";
import { dynamicFormActionWrapper } from "@kdnk.dev/form-actions";
import { Database } from "@/lib/database";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { formConfig } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/form-schema";

export function AnimalDynamicForm(props: KFormProps<any>) {
  // Can't re-use the Form object because the context is not properly propagated and is passed manually instead.
  const { DynamicFormComponent, DynamicFormContents, Schema } = useMemo(
    () =>
      kdnkDynamicForm(formConfig).withSubmitAction(
        dynamicFormActionWrapper<Database>(formConfig).forAction(
          dynamicFormUpsertActionProxy,
        ),
      ),
    [],
  );

  return (
    <DynamicFormComponent
      {...props}
      render={(renderProps) => (
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
