import React, { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabaseClient-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAnimalForUser } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/actions";
import DeleteRecordButton from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/delete-record-button";

const animalDynamicFormUrl = (
  fruitId: string,
  viewMode: "view-readonly" | "view-editable" | "edit",
) => `/4_dynamic-forms/1~create-&-edit-records/${fruitId}/${viewMode}`;

export default async function Page() {
  const client = createClient();
  const user = await client.auth.getUser();

  if (user.error || !user.data.user?.id) {
    return <div>Not Logged In</div>;
  }

  const animals = await getAnimalForUser(user.data.user.id);

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">Create & Edit Records</p>
        <ul className={"f8w-flex f8w-flex-col f8w-gap-4"}>
          {animals.data?.map((animal) => (
            <Fragment key={animal.entry_id}>
              <Separator />
              <li className="f8w-flex f8w-flex-row f8w-justify-between f8w-items-center f8w-w-full">
                <div> {animal.name}</div>
                <div className="f8w-flex f8w-flex-row f8w-items-center f8w-gap-4">
                  <Link
                    href={animalDynamicFormUrl(
                      animal.entry_id!,
                      "view-readonly",
                    )}
                  >
                    <Button variant={"outline"}>View</Button>
                  </Link>
                  <Link
                    href={animalDynamicFormUrl(
                      animal.entry_id!,
                      "view-editable",
                    )}
                  >
                    <Button variant={"outline"}>View/Edit</Button>
                  </Link>
                  <Link href={animalDynamicFormUrl(animal.entry_id!, "edit")}>
                    <Button variant={"outline"}>Edit</Button>
                  </Link>
                  <DeleteRecordButton entryId={animal.entry_id!} />
                </div>
              </li>
            </Fragment>
          ))}
          <Separator />
          <div className="f8w-flex f8w-flex-row f8w-justify-start f8w-items-center f8w-w-full">
            <Link href={`/4_dynamic-forms/1~create-&-edit-records/new`}>
              <Button>Create New Fruit Record</Button>
            </Link>
          </div>
        </ul>
      </div>
    </main>
  );
}
