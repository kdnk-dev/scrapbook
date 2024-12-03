import React from "react";
import LoginForm from "@/app/(component-demos)/3_login-&-signup/1_login/login-form";

export default function Page() {
  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <LoginForm />
      </div>
    </main>
  );
}
