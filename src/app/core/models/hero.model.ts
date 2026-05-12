export interface Powerstats {
  intelligence?: number;
  strength?: number;
  speed?: number;
  durability?: number;
  power?: number;
  combat?: number;
}

export interface Appearance {
  gender?: string;
  race?: string;
  height?: [string, string];
  weight?: [string, string];
  eyeColor?: string;
  hairColor?: string;
}

export interface Biography {
  fullName?: string;
  alterEgos?: string;
  aliases?: string[];
  placeOfBirth?: string;
  firstAppearance?: string;
  publisher?: string;
  alignment?: string;
}

export interface Work {
  occupation?: string;
  base?: string;
}

export interface Connections {
  groupAffiliation?: string;
  relatives?: string;
}

export interface Images {
  xs?: string | string[];
  sm?: string | string[];
  md?: string | string[];
  lg?: string | string[];
}

export interface Hero {
  id: string | number;
  name: string;
  slug: string;
  powerstats?: Powerstats;
  appearance?: Appearance;
  biography?: Biography;
  work?: Work;
  connections?: Connections;
  images?: Images;
}