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
import Head from 'next/head';
import { titleCase } from 'title-case';

interface SrdData {
  info: string;
  component: string;
  data: object[] | object;
}

function DataComponent({ component, data }: { component: string, data: object[] | object }) {
  switch(component) {
    case 'Equipment':
      return <Equipment data={ data as EquipmentRecord[] } />
    case 'Armour':
      return <Armour data={ data as ArmourRecord[] } />
    case 'ForceFields':
      return <ForceFields data={ data as FieldRecord[] } />
    case 'Modifications': 
      return <Modifications data={ data as ModRecord[] }/>
    case 'Ammunition': 
      return <Ammunition data={ data as AmmunitionRecord[] }/>
    case 'MeleeWeapons': 
      return <MeleeWeapons data={ data as MeleeWeaponRecord[] }/>
    case 'RangedWeapons': 
      return <RangedWeapons data={ data as RangedWeaponRecord[] }/>
    case 'Backgrounds':
      return <Backgrounds data={ data as BackgroundsTable[] }/>
    case 'Actions':
      return <Actions data={ data as ActionsTable[] } />
    case 'CriticalDamage':
      return <CriticalDamage data={ data as CriticalDamageTable } />
    case 'EliteAdvance':
      return <EliteAdvance data={ data as EliteAdvanceRecord } />
    case 'NavigatorPowers':
      return <NavigatorPowers data={ data as NavigatorPowerType[] } />
    case 'Origins':
      return <Origins data={ data as OriginsTable[] } />
    case 'PsychicDiscipline':
      return <PsychicDiscipline data={ data as PsychicDisciplineRecord } />
    case 'Roles':
      return <Roles data={ data as RolesTable[] } />
    case 'Skills':
      return <Skills data={ data as SkillsTable[] } />
    case 'StarshipActions':
      return <StarshipActions data={ data as StarshipActionGroups } />
    case 'StarshipComponents':
      return <StarshipComponents data={ data as StarshipComponentRecord[] } />
    case 'StarshipEssential':
      return <StarshipEssential data={ data as EssentialComponents } />
    case 'StarshipHulls':
      return <StarshipHulls data={ data as StarshipHullRecord[] } />
    case 'StarshipSupplemental':
      return <StarshipSupplemental data={ data as SupplementalComponents } />
    case 'StarshipWeapons':
      return <StarshipWeapons data={ data as WeaponComponents } />
    case 'Talents':
      return <Talents data={ data as TalentType[] } />
    case 'TorpedoesAttackCraft':
      return <TorpedoesAttackCraft data={ data as TorpedoAttackCraft } />
    case 'Traits':
      return <Traits data={ data as TraitTable[] } />
  }
}

export default function SrdPage({ params }: { params: { srdPath: string[] } }) {
  const { type, content, title } = loadDocument(params.srdPath);

  if (type === 'md') {
    return (
      <>
        <Document doc={content as string} includeToc />
      </>
      
    )
  } else if (type === 'json') {
    return (
      <>
        <Document doc={(content as SrdData)?.info} />
        <DataComponent 
          component={(content as SrdData)?.component}
          data={(content as SrdData)?.data} />
      </>
    )
  } else {
    return (
      <>
        <h2>{titleCase(type)}</h2>
        <div>{content as string}</div>
      </>
    )
  }
}
