import { KActionState, KdnkFormTypes, KFormData } from "@kdnk.dev/forms";
import { dynamicFormUpsertAction, fetchMultiple } from "@kdnk.dev/form-actions";
import { createClient } from "@/lib/supabaseClient-server";
import { Database } from "@/lib/database";
import { revalidatePath } from "next/cache";

export const getAnimalForUserKdnk = fetchMultiple(
  () => createClient<Database>(),
  "animals",
  "user_id",
  (row: Database["public"]["Tables"]["fruits"]["Row"]) => row as KFormData<any>,
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
      // Future Louis should really figure out which ones of these is right.
      revalidatePath(`/app/4_dynamic-forms/dynamic-array`);
      revalidatePath(`/4_dynamic-forms/dynamic-array`);
    },
    (error) => {
      console.log(error);
      return { rootError: error.message };
    },
  );
