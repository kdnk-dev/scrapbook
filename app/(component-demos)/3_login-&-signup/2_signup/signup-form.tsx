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
  email: z.string().email(),
  password: z.string().min(6),
  password_confirm: z.string().min(6),
});

export type SignupFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(kdDummySubmitAction<SignupFormT>())
  .withChildComponent(FormContents);

function FormContents({
  actionLastInvocationStatus,
}: KRenderProps<SignupFormT>) {
  return (
    <Card className="mx-auto p-6 w-3/4 max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
          Sign Up
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actionLastInvocationStatus === "success" ? (
          <div>Please check your email for next steps</div>
        ) : (
          <>
            <KdFormField
              name="email"
              label="Email"
              renderField={KdInputField("email", "hello@email.com")}
            />
            <KdFormField
              name="password"
              label="Password"
              renderField={KdInputField("password", "")}
            />
            <KdFormField
              name="password_confirm"
              label="Confirm Password"
              renderField={KdInputField("password", "")}
            />
            <KdSubmitButton>Sign Up</KdSubmitButton>
          </>
        )}
      </CardContent>
    </Card>
  );
}
