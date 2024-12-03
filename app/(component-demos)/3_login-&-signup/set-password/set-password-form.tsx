"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import {
  kdDummySubmitAction,
  KdFormField,
  KdInputField,
  kdnkForm,
  KdnkFormTypes,
  KdSubmitButton,
  KRenderProps,
} from "@kdnk.dev/forms";

const { Form, Schema } = kdnkForm({
  password: z.string().min(1),
  password_confirm: z.string().min(1),
});

export type SetPasswordFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(kdDummySubmitAction<SetPasswordFormT>("success-no-op"))
  .withChildComponent(FormContents);

function FormContents({
  actionLastInvocationStatus,
}: KRenderProps<SetPasswordFormT>) {
  return (
    <Card className="mx-auto p-6 w-3/4 max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
          Set Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actionLastInvocationStatus === "success" ? (
          <div>Success!</div>
        ) : (
          <>
            <KdFormField
              name="password"
              label="New Password"
              render={KdInputField("password", "")}
            />
            <KdFormField
              name="password_confirm"
              label="Confirm New Password"
              render={KdInputField("password", "")}
            />
            <KdSubmitButton>Set Password</KdSubmitButton>
          </>
        )}
      </CardContent>
    </Card>
  );
}
