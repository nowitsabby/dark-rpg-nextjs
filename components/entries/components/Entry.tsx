'use client'

import Stack from "@mui/material/Stack";
import ReturnLink from "./ReturnLink";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

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
      <h3>{name}</h3>
      <table>
        <tbody>
          {children}
        </tbody>
      </table>
      <Container>{description}</Container>
    </Stack>
  );
}
