import React from "react";
import { Separator } from "@/components/ui/separator";
import FruitForm from "@/app/(component-demos)/1_forms/4~create-&-edit-records/fruit-form";
import { getFruitById } from "@/app/(component-demos)/1_forms/4~create-&-edit-records/actions";
import { createClient } from "@/lib/supabaseClient-server";
import BackButton from "@/app/(component-demos)/1_forms/4~create-&-edit-records/back-button";

export default async function Page({
  params,
}: {
  params: {
    id: string;
    viewMode: ("view-readonly" | "view-editable" | "edit")[] | undefined;
  };
}) {
  return params.id === "new" ? (
    <CreateNewFruit />
  ) : (
    <EditExistingFruit params={params} />
  );
}

async function CreateNewFruit() {
  const client = createClient();
  const user = await client.auth.getUser();

  if (user.error || !user.data.user?.id) {
    return <div>Not Logged In</div>;
  }

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <BackButton />
        <Separator />
        <FruitForm
          data={{
            newRecordDefaults: { user_id: user.data.user.id },
          }}
        />
      </div>
    </main>
  );
}

async function EditExistingFruit({
  params,
}: {
  params: {
    id: string;
    viewMode: ("view-readonly" | "view-editable" | "edit")[] | undefined;
  };
}) {
  const fruit = await getFruitById(params.id);

  if (fruit.error || !fruit.data) {
    return (
      <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
        <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
          <p className="f8w-text-2xl f8w-font-semibold">Invalid fruit ID</p>
        </div>
      </main>
    );
  }

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <BackButton />
        <Separator />
        <FruitForm
          data={{
            existingRecord: fruit.data,
            existingRecordInitialState:
              (params.viewMode && params.viewMode[0]) ?? "view-editable",
          }}
        />
      </div>
    </main>
  );
}
