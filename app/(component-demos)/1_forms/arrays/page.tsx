"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormArray, KFormData, useFormGroup } from "@kdnk.dev/forms";
import GroupedForm, {
  SimpleFormT,
} from "@/app/(component-demos)/1_forms/arrays/grouped-form";

export default function Page() {
  const { formGroup, lastActionStatus, submitAll, submitPending } =
    useFormGroup();

  const existingRecords: KFormData<SimpleFormT>[] = [
    { name: "First Person", email: "first@person.com" },
    { name: "Second Person", email: "second@person.com" },
    { name: "Third Person", email: "third@person.com" },
  ];

  const AddButton = <Button>Add New Record</Button>;

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <FormArray
          Form={GroupedForm}
          AddNewRecordButton={AddButton}
          formGroup={formGroup}
          existingRecords={existingRecords}
          existingRecordInitialState={"edit"}
          existingRecordsOrderBy={"entry_id"}
          newRecordDefaults={{}}
          newRecordInitialCount={0}
          maxTotalRecords={3}
        />

        <Separator />
        <div>
          Enter &#34;error&#34; as the name to trigger a server-side error.
        </div>

        <div className={"f8w-flex f8w-flex-row f8w-gap-4"}>
          <Button
            className="f8w-max-w-sm"
            disabled={submitPending}
            onClick={() => submitAll()}
          >
            Submit All
          </Button>
        </div>

        <div className="f8w-flex f8w-flex-col f8w-gap-4 f8w-items-start">
          <div className="f8w-text-m f8w-whitespace-pre f8w-font-mono">
            isActionPending: {JSON.stringify(submitPending, null, " ")}
            <br />
            lastActionInvocationStatus:
            {JSON.stringify(lastActionStatus, null, " ")}
          </div>
        </div>
      </div>
    </main>
  );
}
