import React from "react";
import { createClient } from "@/lib/supabaseClient-server";
import { getAnimalForUser } from "@/app/(component-demos)/4_dynamic-forms/dynamic-array/actions";
import { Separator } from "@/components/ui/separator";
import { AnimalDynamicFormArray } from "@/app/(component-demos)/4_dynamic-forms/dynamic-array/animal-form-array";

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
        <p className="f8w-text-2xl f8w-font-semibold">Dynamic Form Array</p>
        <Separator />
        <AnimalDynamicFormArray
          existingRecords={animals.data!}
          newRecordDefaults={{
            user_id: user.data.user.id,
          }}
        />
      </div>
    </main>
  );
}
