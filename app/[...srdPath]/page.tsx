import AmmunitionEntry from '@/components/entries/AmmunitionEntry';
import ArmourEntry from '@/components/entries/ArmourEntry';
import BackgroundEntry from '@/components/entries/BackgroundEntry';
import EquipmentEntry from '@/components/entries/EquipmentEntry';
import ForceFieldEntry from '@/components/entries/ForceFieldEntry';
import MeleeWeaponEntry from '@/components/entries/MeleeWeaponEntry';
import ModificationEntry from '@/components/entries/ModificationEntry';
import NavigatorPowerEntry from '@/components/entries/NavigatorPowerEntry';
import OriginEntry from '@/components/entries/OriginEntry';
import PsychicPowerEntry from '@/components/entries/PsychicPowerEntry';
import RangedWeaponEntry from '@/components/entries/RangedWeaponEntry';
import RoleEntry from '@/components/entries/RoleEntry';
import SkillEntry from '@/components/entries/SkillEntry';
import StarshipComponentEntry from '@/components/entries/StarshipComponentEntry';
import StarshipHullEntry from '@/components/entries/StarshipHullEntry';
import StarshipWeaponEntry from '@/components/entries/StarshipWeaponEntry';
import TalentEntry from '@/components/entries/TalentEntry';
import TraitEntry from '@/components/entries/TraitEntry';
import Actions, { ActionsTable } from '@/components/tables/Actions';
import Ammunition from '@/components/tables/Ammunition';
import Armour from '@/components/tables/Armour';
import Backgrounds from '@/components/tables/Backgrounds';
import CriticalDamage, { CriticalDamageTable } from '@/components/tables/CriticalDamage';
import EliteAdvance, { EliteAdvanceRecord } from '@/components/tables/EliteAdvance';
import Equipment from '@/components/tables/Equipment';
import ForceFields from '@/components/tables/ForceFields';
import MeleeWeapons from '@/components/tables/MeleeWeapons';
import Modifications from '@/components/tables/Modifications';
import NavigatorPowers from '@/components/tables/NavigatorPowers';
import Origins from '@/components/tables/Origins';
import PsychicDiscipline from '@/components/tables/PsychicDiscipline';
import RangedWeapons from '@/components/tables/RangedWeapons';
import Roles from '@/components/tables/Roles';
import Skills from '@/components/tables/Skills';
import StarshipActions, { StarshipActionGroups } from '@/components/tables/StarshipActions';
import StarshipComponents from '@/components/tables/StarshipComponents';
import StarshipEssential, { EssentialComponents, EssentialComponentsKey } from '@/components/tables/StarshipEssential';
import StarshipHulls from '@/components/tables/StarshipHulls';
import StarshipSupplemental, { SupplementalComponents, SupplementalComponentsKey } from '@/components/tables/StarshipSupplemental';
import StarshipWeapons, { WeaponComponents, WeaponComponentsKey } from '@/components/tables/StarshipWeapons';
import Talents from '@/components/tables/Talents';
import TorpedoesAttackCraft, { TorpedoAttackCraft } from '@/components/tables/TorpedoesAttackCraft';
import Traits from '@/components/tables/Traits';
import { 
  AmmunitionRecord, 
  ArmourRecord, 
  BackgroundRecord, 
  EquipmentRecord, 
  ForceFieldRecord, 
  MeleeWeaponRecord, 
  ModRecord, 
  NavigatorPowerRecord, 
  OriginRecord, 
  PsychicPowerRecord, 
  RangedWeaponRecord, 
  RoleRecord, 
  SkillRecord, 
  StarshipComponentRecord, 
  StarshipHullRecord, 
  StarshipWeaponRecord, 
  TalentRecord, 
  TraitRecord
} from '@/components/types/Records';
import Document from '@/components/util/Document'
import { DOC_TYPES, loadDocument } from '@/lib/srd'
import { camelCase } from 'change-case';
import path from 'path';

interface SrdData {
  info: string;
  component: string;
  data: object[] | object;
  id?: string;
}

function DataTableComponent({ rootPath, component, data }: { rootPath: string, component: string, data: object[] | object }) {
  switch(component) {
    case 'Actions':
      return <Actions data={ data as ActionsTable[] } />
    case 'Ammunition': 
      return <Ammunition rootPath={rootPath} data={ data as AmmunitionRecord[] }/>
    case 'Armour':
      return <Armour rootPath={rootPath} data={ data as ArmourRecord[] } />
    case 'Backgrounds':
      return <Backgrounds rootPath={rootPath} data={ data as BackgroundRecord[] }/>
    case 'CriticalDamage':
      return <CriticalDamage data={ data as CriticalDamageTable } />
    case 'EliteAdvance':
      return <EliteAdvance rootPath={rootPath} data={ data as EliteAdvanceRecord } />
    case 'Equipment':
      return <Equipment rootPath={rootPath} data={ data as EquipmentRecord[] } />
    case 'ForceFields':
      return <ForceFields rootPath={rootPath} data={ data as ForceFieldRecord[] } />
    case 'MeleeWeapons': 
      return <MeleeWeapons rootPath={rootPath} data={ data as MeleeWeaponRecord[] }/>
    case 'Modifications':
      return <Modifications rootPath={rootPath} data={ data as ModRecord[] } />
    case 'NavigatorPowers':
      return <NavigatorPowers rootPath={rootPath} data={ data as NavigatorPowerRecord[] } />
    case 'Origins':
      return <Origins rootPath={rootPath} data={ data as OriginRecord[] } />
    case 'PsychicDiscipline':
      return <PsychicDiscipline rootPath={rootPath} data={ data as PsychicPowerRecord[] } />
    case 'RangedWeapons':
      return <RangedWeapons rootPath={rootPath} data={ data as RangedWeaponRecord[] }/>
    case 'Roles':
      return <Roles rootPath={rootPath} data={ data as RoleRecord[] } />
    case 'Skills':
      return <Skills rootPath={rootPath} data={ data as SkillRecord[] } />
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
      return <Talents rootPath={rootPath} data={ data as TalentRecord[] } />
    case 'TorpedoesAttackCraft':
      return <TorpedoesAttackCraft rootPath={rootPath} data={ data as TorpedoAttackCraft } />
    case 'Traits':
      return <Traits rootPath={rootPath} data={ data as TraitRecord[] } />
  }
}

function DataEntryComponent({ rootPath, component, data, id }: { 
  rootPath: string;
  component: string;
  data: object[] | object;
  id: string;
}) {
  switch(component) {
    case 'Ammunition': 
      return <AmmunitionEntry rootPath={rootPath} data={ data as AmmunitionRecord[] } id={id}/>
    case 'Armour':
      return <ArmourEntry rootPath={rootPath} data={ data as ArmourRecord[] } id={id} />
    case 'Backgrounds':
      return <BackgroundEntry rootPath={rootPath} data={ data as BackgroundRecord[] } id={id}/>
    case 'CriticalDamage':
      return <CriticalDamage data={ data as CriticalDamageTable } />
    case 'EliteAdvance':
      if ((data as EliteAdvanceRecord).talents) {
        return <TalentEntry rootPath={rootPath} data={ (data as EliteAdvanceRecord).talents as TalentRecord[] } id={id}/>
      } else {
        return <EliteAdvance rootPath={rootPath} data={ data as EliteAdvanceRecord } />
      }
    case 'Equipment':
      return <EquipmentEntry rootPath={rootPath} data={ data as EquipmentRecord[] } id={id} />
    case 'ForceFields':
      return <ForceFieldEntry rootPath={rootPath} data={ data as ForceFieldRecord[] } id={id} />
    case 'MeleeWeapons': 
      return <MeleeWeaponEntry rootPath={rootPath} data={ data as MeleeWeaponRecord[] } id={id} />
    case 'Modifications':
      return <ModificationEntry rootPath={rootPath} data={ data as ModRecord[] } id={id} />
    case 'NavigatorPowers':
      return <NavigatorPowerEntry rootPath={rootPath} data={ data as NavigatorPowerRecord[] } id={id} />
    case 'Origins':
      return <OriginEntry rootPath={rootPath} data={ data as OriginRecord[] } id={id} />
    case 'PsychicDiscipline':
      return <PsychicPowerEntry rootPath={rootPath} data={ (data as PsychicPowerRecord[]) } id={id} />
    case 'RangedWeapons':
      return <RangedWeaponEntry rootPath={rootPath} data={ data as RangedWeaponRecord[] } id={id} />
    case 'Roles':
      return <RoleEntry rootPath={rootPath} data={ data as RoleRecord[] } id={id} />
    case 'Skills':
      return <SkillEntry rootPath={rootPath} data={ data as SkillRecord[] } id={id} />
    case 'StarshipComponents':
      return <StarshipComponentEntry rootPath={rootPath} data={ data as StarshipComponentRecord[] } id={id} />
    case 'StarshipEssential':
      const essentialComponentPath: EssentialComponentsKey = camelCase((rootPath.split('\\').at(-2) as string)) as EssentialComponentsKey;
      const essentialComponentRoot = path.join(...rootPath.split('\\').slice(0, -2));
      if (essentialComponentPath) {
        return <StarshipComponentEntry 
        rootPath={essentialComponentRoot} 
        data={ ((data as EssentialComponents)[essentialComponentPath] as StarshipComponentRecord[]) } 
        id={id.split('\\').at(-1) as string} 
      />
      }
      break;
    case 'StarshipHulls':
      return <StarshipHullEntry rootPath={rootPath} data={ data as StarshipHullRecord[] } id={id} />
    case 'StarshipSupplemental':
      const supplementComponentPath: SupplementalComponentsKey = camelCase((rootPath.split('\\').at(-2) as string)) as SupplementalComponentsKey;
      const supplementComponentRoot = path.join(...rootPath.split('\\').slice(0, -2));
      if (supplementComponentPath) {
        return <StarshipComponentEntry 
        rootPath={supplementComponentRoot} 
        data={ ((data as SupplementalComponents)[supplementComponentPath] as StarshipComponentRecord[]) } 
        id={id.split('\\').at(-1) as string} 
      />
      }
      break;
    case 'StarshipWeapons':
      const weaponComponentPath: WeaponComponentsKey = camelCase((rootPath.split('\\').at(-2) as string)) as WeaponComponentsKey;
      const weaponComponentRoot = path.join(...rootPath.split('\\').slice(0, -2));
      if (weaponComponentPath) {
        return <StarshipWeaponEntry 
        rootPath={weaponComponentRoot} 
        data={ ((data as WeaponComponents)[weaponComponentPath] as StarshipWeaponRecord[]) } 
        id={id.split('\\').at(-1) as string} 
      />
      }
      break;
    case 'Talents':
      return <TalentEntry rootPath={rootPath} data={ data as TalentRecord[] } id={id} />
    case 'TorpedoesAttackCraft':
      return <TorpedoesAttackCraft rootPath={rootPath} data={ data as TorpedoAttackCraft } />
    case 'Traits':
      return <TraitEntry rootPath={rootPath} data={ data as TraitRecord[] } id={id} />
  }
}

export default function SrdPage({ params }: { params: { srdPath: string[] } }) {
  const { type, content, id } = loadDocument(params.srdPath);
  const srdPath = path.join(...params.srdPath);

  if (type === DOC_TYPES.PAGE) {
    return (
      <>
        <Document doc={content as string} includeToc />
      </>
      
    )
  } else if (type === DOC_TYPES.TABLE) {
    return (
      <>
        <Document doc={(content as SrdData)?.info} />
        <DataTableComponent 
          rootPath={srdPath}
          component={(content as SrdData)?.component}
          data={(content as SrdData)?.data} />
      </>
    )
  } else if (type === DOC_TYPES.ENTRY) {
    return (
      <>
        <DataEntryComponent 
          rootPath={path.join(srdPath, '../')}
          component={(content as SrdData)?.component}
          data={(content as SrdData)?.data}
          id={id} />
      </>
    )
  } else {
    return (
      <>
        <h2>Error</h2>
        <div>{content as string}</div>
      </>
    )
  }
}
