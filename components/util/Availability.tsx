type AvailabilityMap = {
  [id: string]: number;
};

const availabilityMap: AvailabilityMap = {
  '-': 100,
  ubiquitous: 40,
  abundant: 30,
  plentiful: 20,
  common: 10,
  average: 0,
  special: 0,
  scarce: -10,
  rare: -20,
  'very rare': -30,
  'extremely rare': -40,
  'near unique': -50,
  unique: -60,
};

export default function availability(input: string): number {
  return availabilityMap[input.toLowerCase()];
}
