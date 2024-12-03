"use client";

import {
  kdnkDynamicFormArray,
  KFormData,
  KFormProps,
  useFormGroup,
} from "@kdnk.dev/forms";
import React, { useMemo } from "react";
import { formConfig } from "@/app/(component-demos)/4_dynamic-forms/dynamic-array/form-schema";
import { dynamicFormUpsertActionProxy } from "@/app/(component-demos)/4_dynamic-forms/dynamic-array/actions";
import { Button } from "@/components/ui/button";

export function AnimalDynamicFormArray(props: {
  existingRecords: KFormData<any>[];
  newRecordDefaults: KFormProps<any>;
}) {
  // Can't re-use the Form object because the context is not properly propagated and is passed manually instead.
  const { DynamicFormArray } = useMemo(
    () =>
      kdnkDynamicFormArray(formConfig).withSubmitAction((formData) =>
        dynamicFormUpsertActionProxy("animals", "entry_id", formData),
      ),
    [],
  );

  const { formGroup, validateAll, submitAll, submitPending, lastActionStatus } =
    useFormGroup();

  return (
    <>
      <div className={"f8w-flex f8w-flex-col f8w-gap-y-4"}>
        <DynamicFormArray {...props} formGroup={formGroup} />
        <div className={"f8w-flex f8w-flex-row f8w-gap-x-4"}>
          <Button disabled={submitPending} onClick={() => validateAll()}>
            Validate All
          </Button>
          <Button disabled={submitPending} onClick={() => submitAll()}>
            Submit All
          </Button>
        </div>
      </div>

      <div className="f8w-flex f8w-flex-col f8w-gap-4 f8w-items-start">
        <div className="f8w-text-m f8w-whitespace-pre f8w-font-mono">
          isActionPending: {JSON.stringify(submitPending, null, " ")}
          <br />
          lastActionInvocationStatus:
          {JSON.stringify(lastActionStatus, null, " ")}
        </div>
      </div>
    </>
  );
}
