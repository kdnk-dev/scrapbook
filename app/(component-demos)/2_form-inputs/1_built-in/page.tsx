import { Separator } from "@/components/ui/separator";
import React from "react";
import InputsDemoForm from "@/app/(component-demos)/2_form-inputs/1_built-in/inputs-demo-form";

export default function Page() {
  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">Built-in form inputs</p>
        <Separator />
        <InputsDemoForm />
      </div>
    </main>
  );
}
