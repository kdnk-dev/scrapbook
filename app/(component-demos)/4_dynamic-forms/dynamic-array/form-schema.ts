import { DynamicFormDefinition } from "@kdnk.dev/forms/server";
import { z } from "zod";
import { DynamicFormDatabaseDefinitionT } from "@kdnk.dev/forms";

const AnimalDatabaseDefinition: DynamicFormDatabaseDefinitionT = {
  animals: {
    user_id: "primaryKey",
    entry_id: "primaryKey",
    type: "text",
    name: "text",
    age: "number",
    email: "text",
    vaccines: "textArray",
    favourite_food: "text",
    other_foods: "textArray",
    consent: "boolean",
    is_vegetarian: "boolean",
  },
};

const formDefinition = DynamicFormDefinition.forDbTable(
  AnimalDatabaseDefinition,
  "animals",
);

export type AnimalFormDefinitionT = z.infer<typeof formDefinition>;

export const formConfig: AnimalFormDefinitionT = formDefinition.parse({
  table: { name: "animals", primaryKeyColumn: "entry_id" },
  hiddenFields: { user_id: "uuid", creation_order: "number" },
  formArray: {
    orderByColumn: "creation_order",
    addRecordButtonText: "Add New Animal",
    existingRecordsInitialState: "edit",
    newRecordInitialCount: 1,
  },
  formFields: {
    type: {
      fieldType: "select",
      label: "Type of Animal",
      config: {
        selectableOptions: { dog: "Dog", cat: "Cat", rabbit: "Rabbit" },
      },
    },
    name: {
      fieldType: "text",
      label: "Animal's Name",
      config: {
        minLength: 3,
        maxLength: 8,
        matchPattern: "[a-zA-Z]+",
        placeholder: "Fluffy",
      },
    },
    age: {
      fieldType: "number",
      label: "Animal's Age",
      config: { minValue: 1, maxValue: 99 },
    },
  },
});
