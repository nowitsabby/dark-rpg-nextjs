export interface AmmunitionRecord {
  name: string;
  id: string;
  availability: string;
  usedWith: string[];
  effect: string;
  source: string;
}

export interface ArmourRecord {
  name: string;
  id: string;
  type: string;
  locations: string[];
  ap: number;
  maxAg: number | null;
  description: string;
  weight: string;
  availability: string;
  source: string;
}

export interface BackgroundRecord {
  name: string;
  id: string;
  skills: Array<string | Array<string | string[]>>;
  talents: Array<string | Array<string | string[]>>;
  equipment: Array<string | Array<string | string[]>>;
  bonuses: Array<{
    title: string;
    effect: string;
  }>;
  aptitude: string[];
  traits: string[] | string | null;
}

export interface EquipmentRecord {
  name: string;
  id: string;
  weight: string;
  availability: string;
  description: string;
  source: string;
}

export interface TalentRecord {
  name: string;
  id: string;
  specialist: boolean;
  specialisations: string[] | null;
  tier: number | null;
  aptitudes: string[] | null;
  prerequisites: string[] | null;
  alignment: string | null;
  benefit: string;
  source: string;
}

export interface ForceFieldRecord {
  name: string;
  id: string;
  protectionRating: number;
  weight: string;
  availability: string;
  description: string;
  source: string;
}

export interface WeaponRecord {
  name: string;
  id: string;
  type: string;
  class: string;
  range: string;
  damage: string;
  penetration: number | string;
  special: string;
  description: string;
  weight: string;
  availability: string;
  source: string;
}

export interface RangedWeaponRecord extends WeaponRecord {
  rateOfFire: string;
  clip: number | string;
  reload: string;
}

export interface MeleeWeaponRecord extends WeaponRecord {
  twoHanded: boolean;
}

export interface ModRecord {
  name: string;
  id: string;
  weight: string;
  availability: string;
  upgrades: string;
  description: string;
  source: string;
}

export interface NavigatorPowerRecord {
  name: string;
  id: string;
  novice: string;
  adept: string;
  master: string;
}

export interface OriginsRecord {
  name: string;
  id: string;
  characteristicModifiers: {
    plus: string[];
    minus: string;
  };
  fateThreshold: number;
  blessing: number;
  bonus: {
    title: string;
    effect: string;
  };
  aptitude: string;
  wounds: number;
}

export interface PsychicPowerRecord {
  name: string;
  id: string;
  cost: number;
  prerequisites: string[];
  action: string;
  focus: string;
  range: string;
  sustained: string;
  subtypes: string[];
  effects: string;
  source: string;
}

export interface PsychicDisciplineRecord {
  discipline: string;
  information: string;
  powers: PsychicPowerRecord[];
}
