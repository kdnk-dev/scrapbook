"use client";

import { Button } from "@/components/ui/button";
import { deleteAnimalById } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/actions";

export default function DeleteRecordButton({ entryId }: { entryId: string }) {
  return (
    <Button variant={"outline"} onClick={() => deleteAnimalById(entryId)}>
      Delete
    </Button>
  );
}
