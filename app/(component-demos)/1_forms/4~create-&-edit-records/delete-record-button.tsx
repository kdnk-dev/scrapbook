"use client";

import { Button } from "@/components/ui/button";
import { deleteFruitById } from "@/app/(component-demos)/1_forms/4~create-&-edit-records/actions";

export default function DeleteRecordButton({ entryId }: { entryId: string }) {
  return (
    <Button variant={"outline"} onClick={() => deleteFruitById(entryId)}>
      Delete
    </Button>
  );
}
