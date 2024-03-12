import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const removeEmptyKeys = (obj: any) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      delete obj[key];
    } else if (typeof value === 'object') {
      removeEmptyKeys(value); // Recursively remove empty keys from nested objects
      if (Object.keys(value).length === 0) {
        delete obj[key]; // Delete the key if the nested object is also empty after removal
      }
    }
  });
}


