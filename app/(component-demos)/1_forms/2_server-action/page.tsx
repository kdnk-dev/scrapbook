"use client";

import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ServerActionForm from "@/app/(component-demos)/1_forms/2_server-action/server-action-form";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(0);

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">
          Form with simple server action
        </p>
        <Separator />
        <ServerActionForm
          key={formKey}
          onActionSucceeded={() => setSubmitted(true)}
        />
        {submitted && (
          <div className="f8w-flex f8w-flex-col f8w-gap-4 f8w-items-start">
            <div className="f8w-text-m">Thanks for submitting the form!</div>
            <Button
              variant="outline"
              className="f8w-max-w-sm"
              onClick={() => {
                setSubmitted(false);
                // Hack to create a new form component.
                setFormKey(Math.random());
              }}
            >
              Start again
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
