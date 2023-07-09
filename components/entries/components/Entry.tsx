'use client'

import Stack from "@mui/material/Stack";
import ReturnLink from "./ReturnLink";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SrdMarkdown from "@/components/util/SrdMarkdown";

export default function Entry({ 
  rootPath, 
  name, 
  description,
  children 
} : {
  rootPath: string;
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Stack gap={2}>
      <ReturnLink rootPath={rootPath} />
      <h2>{name}</h2>
      <table>
        <tbody>
          {children}
        </tbody>
      </table>
      <Container><SrdMarkdown text={description} /></Container>
    </Stack>
  );
}
