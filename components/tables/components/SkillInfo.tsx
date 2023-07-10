import SrdMarkdown from "@/components/util/SrdMarkdown";
import Stack from "@mui/material/Stack";

export default function SkillInfo({
  specialisations,
  description,
  exampleModifiers,
  specialUses,
}: {
  specialisations?: string[] | null;
  description: string;
  exampleModifiers: string;
  specialUses: string[] | null;
}) 
{
  return (
    <Stack>
      {specialisations && (
        <SrdMarkdown text={`_${specialisations.join(', ')}_`} />
      )}
      <Stack direction="row" style={{ alignItems: 'start' }}>
        <Stack style={{ width: '60%', borderRight: '1px solid' }}>
          <SrdMarkdown text={description} />
          {specialUses && (
            <div>
              <strong>Special Uses</strong>
              <SrdMarkdown text={specialUses.join('\n\n')} />
            </div>
          )}
        </Stack>
        <div style={{ width: '40%', padding: '8px' }}>
          <strong>Example Modifiers</strong>
          <SrdMarkdown text={exampleModifiers} />
        </div>
      </Stack>
    </Stack>
  );
};
