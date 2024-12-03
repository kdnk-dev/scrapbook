"use client";

import React from "react";
import ClientActionForm from "@/app/(component-demos)/1_forms/1_client-action/client-action-form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">
          Form with simple client action
        </p>
        <Separator />
        <ClientActionForm />
      </div>
    </main>
  );
}
