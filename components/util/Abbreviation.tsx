export default function abbreviation(input: string): string {
  type AbbreviationMapType = {
    [id: string]: string;
  };

  const abbreviationMap: AbbreviationMapType = {
    agility: 'Ag',
    'ballistic skill': 'BS',
    fellowship: 'Fel',
    infamy: 'Inf',
    influence: 'Inf',
    intelligence: 'Int',
    perception: 'Per',
    strength: 'S',
    toughness: 'T',
    'weapon skill': 'WS',
    willpower: 'Wp',
  };

  return abbreviationMap[input.toLowerCase()];
}
