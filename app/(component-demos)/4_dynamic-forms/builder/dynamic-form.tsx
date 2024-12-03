"use client";

import {
  BaseDynamicFormDefinitionT,
  kdDummySubmitAction,
  kdnkDynamicForm,
  KFormProps,
} from "@kdnk.dev/forms";
import { dynamicFormActionWrapper } from "@kdnk.dev/form-actions";
import { Database } from "@/lib/database";
import { useMemo } from "react";

export function DynamicForm(
  props: KFormProps<any> | { formConfig: BaseDynamicFormDefinitionT },
) {
  // Can't re-use the Form object because the context is not properly propagated and is passed manually instead.
  const { DynamicFormComponent, DynamicFormContents, Schema } = useMemo(
    () =>
      kdnkDynamicForm(props.formConfig).withSubmitAction(
        dynamicFormActionWrapper<Database>(props.formConfig).forAction(
          kdDummySubmitAction(),
        ),
      ),
    [props.formConfig],
  );

  return (
    <DynamicFormComponent
      {...props}
      render={(renderProps) => (
        <>
          <DynamicFormContents {...renderProps} />
        </>
      )}
    />
  );
}
