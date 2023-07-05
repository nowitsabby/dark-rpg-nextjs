import Actions, { ActionsTable } from '@/components/tables/Actions';
import Ammunition, { AmmunitionRecord } from '@/components/tables/Ammunition';
import Armour from '@/components/tables/Armour';
import Backgrounds, { BackgroundsTable } from '@/components/tables/Backgrounds';
import CriticalDamage, { CriticalDamageTable } from '@/components/tables/CriticalDamage';
import EliteAdvance, { EliteAdvanceRecord } from '@/components/tables/EliteAdvance';
import Equipment, { EquipmentRecord } from '@/components/tables/Equipment';
import ForceFields, { FieldRecord } from '@/components/tables/ForceFields';
import MeleeWeapons from '@/components/tables/MeleeWeapons';
import Modifications, { ModRecord } from '@/components/tables/Modifications';
import NavigatorPowers, { NavigatorPowerType } from '@/components/tables/NavigatorPowers';
import Origins, { OriginsTable } from '@/components/tables/Origins';
import PsychicDiscipline, { PsychicDisciplineRecord } from '@/components/tables/PsychicDiscipline';
import RangedWeapons from '@/components/tables/RangedWeapons';
import Roles, { RolesTable } from '@/components/tables/Roles';
import Skills, { SkillsTable } from '@/components/tables/Skills';
import StarshipActions, { StarshipActionGroups } from '@/components/tables/StarshipActions';
import StarshipComponents, { StarshipComponentRecord } from '@/components/tables/StarshipComponents';
import StarshipEssential, { EssentialComponents } from '@/components/tables/StarshipEssential';
import StarshipHulls from '@/components/tables/StarshipHulls';
import StarshipSupplemental, { SupplementalComponents } from '@/components/tables/StarshipSupplemental';
import StarshipWeapons, { WeaponComponents } from '@/components/tables/StarshipWeapons';
import Talents, { TalentType } from '@/components/tables/Talents';
import TorpedoesAttackCraft, { TorpedoAttackCraft } from '@/components/tables/TorpedoesAttackCraft';
import Traits, { TraitTable } from '@/components/tables/Traits';
import { ArmourRecord } from '@/components/tables/components/ArmourGroupTable';
import { StarshipHullRecord } from '@/components/tables/components/HullTable';
import { MeleeWeaponRecord, RangedWeaponRecord } from '@/components/tables/components/WeaponGroupTable';
import Document from '@/components/util/Document'
import { loadDocument } from '@/lib/srd'
import { titleCase } from 'title-case';

interface SrdData {
  info: string;
  type: string;
  data: object[] | object;
}

function DataComponent({ doc }: { doc: SrdData }) {
  switch(doc.type) {
    case 'Equipment':
      return <Equipment data={ doc.data as EquipmentRecord[] } />
    case 'Armour':
      return <Armour data={ doc.data as ArmourRecord[] } />
    case 'ForceFields':
      return <ForceFields data={ doc.data as FieldRecord[] } />
    case 'Modifications': 
      return <Modifications data={ doc.data as ModRecord[] }/>
    case 'Ammunition': 
      return <Ammunition data={ doc.data as AmmunitionRecord[] }/>
    case 'MeleeWeapons': 
      return <MeleeWeapons data={ doc.data as MeleeWeaponRecord[] }/>
    case 'RangedWeapons': 
      return <RangedWeapons data={ doc.data as RangedWeaponRecord[] }/>
    case 'Backgrounds':
      return <Backgrounds data={ doc.data as BackgroundsTable[] }/>
    case 'Actions':
      return <Actions data={ doc.data as ActionsTable[] } />
    case 'CriticalDamage':
      return <CriticalDamage data={ doc.data as CriticalDamageTable } />
    case 'EliteAdvance':
      return <EliteAdvance data={ doc.data as EliteAdvanceRecord } />
    case 'NavigatorPowers':
      return <NavigatorPowers data={ doc.data as NavigatorPowerType[] } />
    case 'Origins':
      return <Origins data={ doc.data as OriginsTable[] } />
    case 'PsychicDiscipline':
      return <PsychicDiscipline data={ doc.data as PsychicDisciplineRecord } />
    case 'Roles':
      return <Roles data={ doc.data as RolesTable[] } />
    case 'Skills':
      return <Skills data={ doc.data as SkillsTable[] } />
    case 'StarshipActions':
      return <StarshipActions data={ doc.data as StarshipActionGroups } />
    case 'StarshipComponents':
      return <StarshipComponents data={ doc.data as StarshipComponentRecord[] } />
    case 'StarshipEssential':
      return <StarshipEssential data={ doc.data as EssentialComponents } />
    case 'StarshipHulls':
      return <StarshipHulls data={ doc.data as StarshipHullRecord[] } />
    case 'StarshipSupplemental':
      return <StarshipSupplemental data={ doc.data as SupplementalComponents } />
    case 'StarshipWeapons':
      return <StarshipWeapons data={ doc.data as WeaponComponents } />
    case 'Talents':
      return <Talents data={ doc.data as TalentType[] } />
    case 'TorpedoesAttackCraft':
      return <TorpedoesAttackCraft data={ doc.data as TorpedoAttackCraft } />
    case 'Traits':
      return <Traits data={ doc.data as TraitTable[] } />
  }
}

export default function SrdPage({ params }: { params: { srdPath: string[] } }) {
  const { type, data } = loadDocument(params.srdPath);

  if (type === 'doc') {
    return (
      <Document doc={data} includeToc />
    )
  } else if (type === 'json') {
    const doc = JSON.parse(data);
    return (
      <>
        <Document doc={doc.info} />
        <DataComponent doc={doc}/>
      </>
    )
  } else {
    return (
      <>
        <h2>{titleCase(type)}</h2>
        <div>{data}</div>
      </>
    )
  }
}
