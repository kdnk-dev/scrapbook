"use client";

import {
  BaseDynamicFormDefinitionT,
  kdDummySubmitAction,
  kdnkDynamicForm,
  KFormProps,
} from "@kdnk.dev/forms";
import { useMemo } from "react";

export function DynamicForm(
  props: KFormProps<any> | { formConfig: BaseDynamicFormDefinitionT },
) {
  // Can't re-use the Form object because the context is not properly propagated and is passed manually instead.
  const { DynamicFormComponent, DynamicFormContents, Schema } = useMemo(
    () =>
      kdnkDynamicForm(props.formConfig).withSubmitAction(kdDummySubmitAction()),
    [props.formConfig],
  );

  return (
    <DynamicFormComponent
      {...props}
      content={(renderProps) => (
        <>
          <DynamicFormContents {...renderProps} />
        </>
      )}
    />
  );
}
