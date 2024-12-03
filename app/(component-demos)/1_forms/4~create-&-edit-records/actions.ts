"use server";

import {
  createOrUpdateFruitKdnk,
  deleteFruitByIdKdnk,
  getFruitByIdKdnk,
  getFruitsForUserKdnk,
} from "@/app/(component-demos)/1_forms/4~create-&-edit-records/actions-kdnk";

export const getFruitsForUser = getFruitsForUserKdnk;
export const getFruitById = getFruitByIdKdnk;
export const createOrUpdateFruit = createOrUpdateFruitKdnk;
export const deleteFruitById = deleteFruitByIdKdnk;
