import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dirNameToDisplayName(dirName: string) {
  return dirName.replaceAll("-", " ").replace(/^[0-9]+(_|~)/, "");
}
