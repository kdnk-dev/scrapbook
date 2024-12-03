"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import NavigateActionForm from "@/app/(component-demos)/1_forms/3_navigate-action/navigate-action-form";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">
          Form with navigation action
        </p>
        <Separator />
        <NavigateActionForm
          onActionSucceeded={(submitted) =>
            router.push(`${pathname}/${submitted.username}`)
          }
        />
      </div>
    </main>
  );
}
