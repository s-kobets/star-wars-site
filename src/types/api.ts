export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[]; // You might want to replace this with a more specific type if available
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type PersonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};
