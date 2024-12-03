import { KActionState, KdnkFormTypes, KFormData } from "@kdnk.dev/forms";
import {
  deleteSingle,
  dynamicFormUpsertAction,
  fetchMultiple,
  fetchSingle,
} from "@kdnk.dev/forms/server";
import { createClient } from "@/lib/supabaseClient-server";
import { Database } from "@/lib/database";
import { revalidatePath } from "next/cache";

export const getAnimalByIdKdnk = fetchSingle(
  () => createClient<Database>(),
  "animals",
  "entry_id",
  (row: Database["public"]["Tables"]["fruits"]["Row"]) => row as KFormData<any>,
);

export const getAnimalForUserKdnk = fetchMultiple(
  () => createClient<Database>(),
  "animals",
  "user_id",
  (row: Database["public"]["Tables"]["fruits"]["Row"]) => row as KFormData<any>,
);

export const deleteAnimalByIdKdnk = deleteSingle(
  () => createClient<Database>(),
  "animals",
  "entry_id",
  () => revalidatePath(`/app/4_forms/1~create-&-edit-records`),
);

export const dynamicFormUpsertActionProxyKdnk = async <
  FormTypes extends KdnkFormTypes<any>,
>(
  tableName: string,
  primaryKeyColumn: string,
  formData: KFormData<FormTypes>,
): Promise<KActionState<FormTypes>> =>
  dynamicFormUpsertAction(
    () => createClient(),
    tableName,
    primaryKeyColumn,
    formData,
    (record) => {
      revalidatePath(`/app/4_forms/1~create-&-edit-records`);
      revalidatePath(
        `/app/4_forms/1~create-&-edit-records/${record.entry_id}/view`,
      );
      revalidatePath(
        `/app/4_forms/1~create-&-edit-records/${record.entry_id}/view-editable`,
      );
      revalidatePath(
        `/app/4_forms/1~create-&-edit-records/${record.entry_id}/edit`,
      );
    },
  );
