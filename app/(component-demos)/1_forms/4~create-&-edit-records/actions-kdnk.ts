import { KFormData } from "@kdnk.dev/forms";
import { FruitFormT } from "@/app/(component-demos)/1_forms/4~create-&-edit-records/fruit-form";
import {
  deleteSingle,
  fetchMultiple,
  fetchSingle,
  upsertAction,
} from "@kdnk.dev/form-actions";
import { createClient } from "@/lib/supabaseClient-server";
import { Database } from "@/lib/database";
import { revalidatePath } from "next/cache";

export const createOrUpdateFruitKdnk = upsertAction(
  () => createClient<Database>(),
  "fruits",
  { db: "entry_id", form: "entry_id" },
  (formData: KFormData<FruitFormT>) => formData,
  (row: Database["public"]["Tables"]["fruits"]["Row"]) =>
    row as KFormData<FruitFormT>,
  (persistedRecord: KFormData<FruitFormT>) => {
    revalidatePath(
      `/app/1_forms/4~create-&-edit-records/${persistedRecord.entry_id}`,
    );
    revalidatePath(`/app/1_forms/4~create-&-edit-records`);
  },
);

export const getFruitsForUserKdnk = fetchMultiple(
  () => createClient<Database>(),
  "fruits",
  "user_id",
  (row: Database["public"]["Tables"]["fruits"]["Row"]) =>
    row as KFormData<FruitFormT>,
);

export const getFruitByIdKdnk = fetchSingle(
  () => createClient<Database>(),
  "fruits",
  "entry_id",
  (row: Database["public"]["Tables"]["fruits"]["Row"]) =>
    row as KFormData<FruitFormT>,
);

export const deleteFruitByIdKdnk = deleteSingle(
  () => createClient<Database>(),
  "fruits",
  "entry_id",
  () => revalidatePath(`/app/1_forms/4~create-&-edit-records`),
);
