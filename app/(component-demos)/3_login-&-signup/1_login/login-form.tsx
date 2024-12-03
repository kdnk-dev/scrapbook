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

const { Form, Schema } = kdnkForm({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type LoginFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(kdDummySubmitAction<LoginFormT>("success-no-op"))
  .withChildComponent(FormContents);

function FormContents() {
  return (
    <Card className="mx-auto p-6 w-3/4 max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <KdFormField
          name="email"
          label="Email"
          render={KdInputField("email", "hello@email.com")}
        />
        <KdFormField
          name="password"
          label="Password"
          render={KdInputField("password", "")}
        />
        <KdSubmitButton>Login</KdSubmitButton>
      </CardContent>
    </Card>
  );
}
