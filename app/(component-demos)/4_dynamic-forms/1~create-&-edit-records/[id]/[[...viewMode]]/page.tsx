import React from "react";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabaseClient-server";
import { AnimalDynamicForm } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/animal-form";
import BackButton from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/back-button";
import { getAnimalById } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/actions";
import YAML from "yaml";
import { formConfig } from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/form-schema";

export default async function Page({
  params,
}: {
  params: {
    id: string;
    viewMode: ("view-readonly" | "view-editable" | "edit")[] | undefined;
  };
}) {
  return params.id === "new" ? (
    <CreateNewAnimal />
  ) : (
    <EditExistingAnimal params={params} />
  );
}

async function CreateNewAnimal() {
  const client = createClient();
  const user = await client.auth.getUser();

  if (user.error || !user.data.user?.id) {
    return <ErrorPage error={"Not Logged In"} />;
  }
  return (
    <AnimalFormPage
      data={{
        newRecordDefaults: { user_id: user.data.user.id },
      }}
    />
  );
}

async function EditExistingAnimal({
  params,
}: {
  params: {
    id: string;
    viewMode: ("view-readonly" | "view-editable" | "edit")[] | undefined;
  };
}) {
  const fruit = await getAnimalById(params.id);

  if (fruit.error || !fruit.data) {
    return <ErrorPage error={"Invalid animal ID"} />;
  }

  return (
    <AnimalFormPage
      data={{
        existingRecord: fruit.data,
        existingRecordInitialState:
          (params.viewMode && params.viewMode[0]) ?? "view-editable",
      }}
    />
  );
}

function AnimalFormPage(props: any) {
  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <BackButton />
        <Separator />
        <AnimalDynamicForm {...props} />
        <div className={"f8w-h-16"} />
        <p className="f8w-text-2xl f8w-font-semibold">Dynamic Form Schema</p>
        <Separator />
        <div className={"f8w-whitespace-pre f8w-font-mono"}>
          {YAML.stringify(formConfig)}
        </div>
      </div>
    </main>
  );
}

function ErrorPage({ error }: { error: string }) {
  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">{error}</p>
      </div>
    </main>
  );
}
