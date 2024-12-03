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

const formDefinition = DynamicFormDefinition.forDbDef(AnimalDatabaseDefinition);

export type AnimalFormDefinitionT = z.infer<typeof formDefinition>;

export const formConfig: AnimalFormDefinitionT = formDefinition.parse({
  table: { name: "animals", primaryKeyColumn: "entry_id" },
  hiddenFields: { user_id: "uuid" },
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
    email: { fieldType: "email", label: "Animal's Email Address" },
    vaccines: {
      fieldType: "checkboxGroup",
      label: "Which vaccines has the animal had?",
      config: {
        selectableOptions: { rabies: "Rabies", polio: "Polio", covid: "COVID" },
      },
    },
    is_vegetarian: {
      fieldType: "booleanRadioGroup",
      label: "Is the animal vegetarian?",
    },
    favourite_food: {
      fieldType: "radioGroup",
      label: "What is the animal's favourite food?",
      config: {
        selectableOptions: {
          doritos: "Doritos",
          cheetos: "Cheetos",
          popcorn: "Popcorn",
        },
      },
    },
    other_foods: {
      fieldType: "textArray",
      label: "What other foods does the animal like?",
      config: { maxEntries: 3 },
    },
    consent: {
      fieldType: "checkbox",
      label: "Consent",
      config: {
        itemLabel:
          "I am happy for the animal's data to be used to improve the quality of ads I see online",
      },
    },
  },
});
