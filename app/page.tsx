import React from "react";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">kdnk scrapbook</p>
        <Separator />
        <p className="f8w-text-xl">
          select a component on the left to view a demo
        </p>
        <p className="f8w-text-xl">
          you can change the theme with the dropdown at the top of the left nav
        </p>
      </div>
    </main>
  );
}
