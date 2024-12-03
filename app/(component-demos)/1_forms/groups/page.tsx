"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import GroupedForm from "@/app/(component-demos)/1_forms/groups/grouped-form";
import { useFormGroup } from "@kdnk.dev/forms";

export default function Page() {
  const { formGroup, submitPending, lastActionStatus, validateAll, submitAll } =
    useFormGroup();

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">Form 1</p>
        <Separator />
        <GroupedForm formGroup={formGroup} />

        <p className="f8w-text-2xl f8w-font-semibold">Form 2</p>
        <Separator />
        <GroupedForm formGroup={formGroup} />

        <p className="f8w-text-2xl f8w-font-semibold">Form 3</p>
        <Separator />
        <GroupedForm formGroup={formGroup} />
        <Separator />
        <div>
          Enter &#34;error&#34; as the name to trigger a server-side error.
        </div>
        <div className={"f8w-flex f8w-flex-row f8w-gap-4"}>
          <Button
            className="f8w-max-w-sm"
            disabled={submitPending}
            onClick={() => validateAll()}
          >
            Validate All
          </Button>
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
            submitPending: {JSON.stringify(submitPending, null, " ")}
            <br />
            lastSubmitStatus: {JSON.stringify(lastActionStatus, null, " ")}
          </div>
        </div>
      </div>
    </main>
  );
}
