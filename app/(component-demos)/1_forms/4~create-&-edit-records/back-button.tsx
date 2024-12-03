"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="f8w-flex f8w-flex-row f8w-justify-end">
      <Button variant={"outline"} onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}
