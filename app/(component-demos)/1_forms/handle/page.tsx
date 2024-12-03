"use client";

import React, { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { KdnkFormHandle } from "@kdnk.dev/forms";
import { Button } from "@/components/ui/button";
import ImperativeActionForm from "@/app/(component-demos)/1_forms/handle/imperative-action-form";

export default function Page() {
  const formRef = useRef<KdnkFormHandle>(null);
  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">
          Form with imperative validate / submit action
        </p>
        <Separator />
        <ImperativeActionForm handle={formRef} />
        <div className={"f8w-space-x-8"}>
          <Button onClick={() => formRef.current?.validate()}>
            Imperative Validate
          </Button>
          <Button onClick={() => formRef.current?.submit()}>
            Imperative Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
