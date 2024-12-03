"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { username: string } }) {
  const router = useRouter();

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">
          Form with navigation action
        </p>
        <Separator />
        <div className="f8w-flex f8w-flex-col f8w-gap-4 f8w-items-start">
          <div className="f8w-text-m">
            You&#39;ve navigated to .../{params.username}
          </div>
          <Button
            variant="outline"
            className="f8w-max-w-sm"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
}
