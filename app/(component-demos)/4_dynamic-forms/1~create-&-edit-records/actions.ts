"use server";

import {
  deleteAnimalByIdKdnk,
  dynamicFormUpsertActionProxyKdnk,
  getAnimalByIdKdnk,
  getAnimalForUserKdnk,
} from "@/app/(component-demos)/4_dynamic-forms/1~create-&-edit-records/actions-kdnk";

export const getAnimalById = getAnimalByIdKdnk;
export const getAnimalForUser = getAnimalForUserKdnk;
export const deleteAnimalById = deleteAnimalByIdKdnk;

export const dynamicFormUpsertActionProxy = dynamicFormUpsertActionProxyKdnk;
