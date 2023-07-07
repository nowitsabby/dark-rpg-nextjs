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
import path from 'path';
import { titleCase } from 'title-case';

interface SrdData {
  info: string;
  component: string;
  data: object[] | object;
}

function DataComponent({ rootPath, component, data }: { rootPath: string, component: string, data: object[] | object }) {
  switch(component) {
    case 'Equipment':
      return <Equipment rootPath={rootPath} data={ data as EquipmentRecord[] } />
    case 'Armour':
      return <Armour rootPath={rootPath} data={ data as ArmourRecord[] } />
    case 'ForceFields':
      return <ForceFields rootPath={rootPath} data={ data as FieldRecord[] } />
    case 'Modifications': 
      return <Modifications rootPath={rootPath} data={ data as ModRecord[] }/>
    case 'Ammunition': 
      return <Ammunition rootPath={rootPath} data={ data as AmmunitionRecord[] }/>
    case 'MeleeWeapons': 
      return <MeleeWeapons rootPath={rootPath} data={ data as MeleeWeaponRecord[] }/>
    case 'RangedWeapons': 
      return <RangedWeapons rootPath={rootPath} data={ data as RangedWeaponRecord[] }/>
    case 'Backgrounds':
      return <Backgrounds rootPath={rootPath} data={ data as BackgroundsTable[] }/>
    case 'Actions':
      return <Actions data={ data as ActionsTable[] } />
    case 'CriticalDamage':
      return <CriticalDamage data={ data as CriticalDamageTable } />
    case 'EliteAdvance':
      return <EliteAdvance rootPath={rootPath} data={ data as EliteAdvanceRecord } />
    case 'NavigatorPowers':
      return <NavigatorPowers data={ data as NavigatorPowerType[] } />
    case 'Origins':
      return <Origins rootPath={rootPath} data={ data as OriginsTable[] } />
    case 'PsychicDiscipline':
      return <PsychicDiscipline rootPath={rootPath} data={ data as PsychicDisciplineRecord } />
    case 'Roles':
      return <Roles rootPath={rootPath} data={ data as RolesTable[] } />
    case 'Skills':
      return <Skills rootPath={rootPath} data={ data as SkillsTable[] } />
    case 'StarshipActions':
      return <StarshipActions data={ data as StarshipActionGroups } />
    case 'StarshipComponents':
      return <StarshipComponents rootPath={rootPath} data={ data as StarshipComponentRecord[] } />
    case 'StarshipEssential':
      return <StarshipEssential rootPath={rootPath} data={ data as EssentialComponents } />
    case 'StarshipHulls':
      return <StarshipHulls rootPath={rootPath} data={ data as StarshipHullRecord[] } />
    case 'StarshipSupplemental':
      return <StarshipSupplemental rootPath={rootPath} data={ data as SupplementalComponents } />
    case 'StarshipWeapons':
      return <StarshipWeapons rootPath={rootPath} data={ data as WeaponComponents } />
    case 'Talents':
      return <Talents rootPath={rootPath} data={ data as TalentType[] } />
    case 'TorpedoesAttackCraft':
      return <TorpedoesAttackCraft rootPath={rootPath} data={ data as TorpedoAttackCraft } />
    case 'Traits':
      return <Traits rootPath={rootPath} data={ data as TraitTable[] } />
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
    const rootPath = path.join(...params.srdPath);
    return (
      <>
        <Document doc={(content as SrdData)?.info} />
        <DataComponent 
          rootPath={rootPath}
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
