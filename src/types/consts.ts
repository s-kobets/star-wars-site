import { PersonResponse } from "./api";

export const MAP_KEYS_DESCRIPTION = [
  "birth_year",
  "eye_color",
  "gender",
  "hair_color",
  "height",
  "mass",
  "skin_color",
] as Partial<keyof PersonResponse>[];

export enum MAP_KEYS_LIST_ENUM {
  "planet" = "planet",
  "films" = "films",
  "species" = "species",
  "starships" = "starships",
  "vehicles" = "vehicles",
}
