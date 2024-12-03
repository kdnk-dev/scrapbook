"use server";

import { KActionState, KFormData } from "@kdnk.dev/forms";
import { SimpleFormT } from "@/app/(component-demos)/1_forms/2_server-action/server-action-form";

export async function upperCaseServerAction(
  formData: KFormData<SimpleFormT>,
): Promise<KActionState<SimpleFormT>> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return formData.name === "error"
    ? {
        lastInvocationStatus: "error",
        error: { fieldErrors: { name: '"Error" isn\'t a real name!' } },
      }
    : {
        lastInvocationStatus: "success-record-saved",
        persistedRecord: {
          name: formData.name.toUpperCase(),
          email: formData.email.toUpperCase(),
        },
      };
}
