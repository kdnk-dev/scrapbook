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
} from "@kdnk.dev/forms";
import { useState } from "react";

const { Form, Schema } = kdnkForm({
  email: z.string().email(),
});

export type ForgotPasswordFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(kdDummySubmitAction<ForgotPasswordFormT>())
  .withChildComponent(FormContents);

function FormContents() {
  const [requested, setRequested] = useState(false);

  return (
    <Card className="mx-auto p-6 w-3/4 max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
          Forgot Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requested ? (
          <div>Please check your email for next steps</div>
        ) : (
          <>
            <KdFormField
              name="email"
              label="Your Email Address"
              render={KdInputField("email", "me@email.com")}
            />
            <KdSubmitButton>Reset Password</KdSubmitButton>
          </>
        )}
      </CardContent>
    </Card>
  );
}
