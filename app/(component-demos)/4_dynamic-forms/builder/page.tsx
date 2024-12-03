"use client";

import { Separator } from "@/components/ui/separator";

import dynamic from "next/dynamic";
import YAML from "yaml";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DynamicForm } from "@/app/(component-demos)/4_dynamic-forms/builder/dynamic-form";
import { formConfig as defaultFormConfig } from "../1~create-&-edit-records/form-schema";
import { DynamicFormDefinition } from "@kdnk.dev/forms/server";
import { BaseDynamicFormDefinitionT } from "@kdnk.dev/forms";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false },
);

export default function Page() {
  const [code, setCode] = useState<string>(YAML.stringify(defaultFormConfig));
  const [formConfig, setFormConfig] = useState<BaseDynamicFormDefinitionT>();
  const [parseError, setParseError] = useState();

  const parseYaml = () => {
    setFormConfig(undefined);
    setParseError(undefined);
    let parsed;
    try {
      parsed = DynamicFormDefinition.withoutDbDef().parse(
        YAML.parse(code, { strict: false }),
      );
    } catch (e: any) {
      setParseError(e);
      return;
    }
    setFormConfig(parsed);
  };

  return (
    <main className="f8w-flex f8w-h-screen f8w-w-full f8w-items-start f8w-justify-center f8w-px-4 f8w-pt-20">
      <div className="f8w-mx-auto f8w-w-2/3 f8w-space-y-4">
        <p className="f8w-text-2xl f8w-font-semibold">Dynamic Form Builder</p>
        <ul className={"f8w-flex f8w-flex-col f8w-gap-4"}>
          <Separator />
          <div className={"f8w-max-h-[30vh] f8w-overflow-scroll"}>
            <CodeEditor
              padding={15}
              language={"yaml"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </div>
          <Button onClick={() => parseYaml()}>Update Form</Button>
          {parseError && (
            <div className={"f8w-whitespace-pre"}>
              {JSON.stringify(parseError, null, " ")}
            </div>
          )}
          {formConfig && <DynamicForm formConfig={formConfig} />}
        </ul>
      </div>
    </main>
  );
}
