'use client'

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import AddIcon from '@mui/icons-material/Add';
import toTitleCase from '@/lib/util';
import Link from 'next/link';
import {
  Menu,
  MenuItem,
  Sidebar,
  sidebarClasses,
  SubMenu,
} from 'react-pro-sidebar';
import { useState } from "react";

export default function SrdSidebar({ sidebar }: { sidebar: {} }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: { overflow: 'visible' },
      }}
      collapsed={collapsed}
    >
      <Menu>
        <MenuItem
            icon={collapsed ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
          onClick={() => {
            setCollapsed(!collapsed)
          }}
          style={{ textAlign: "center" }}
        >
          <h4>Menu</h4>
        </MenuItem>
        <GenerateSidebar sidebar={sidebar} />
      </Menu>
    </Sidebar>
  );
}

function GenerateSidebar({ sidebar }: { sidebar: {} }) {
  return (
    Object.entries(sidebar).map(([label, item]) => (
      <CreateSubMenu key={label} label={label} item={item as string | object}/>
    ))
  )
};

function CreateSubMenu({ key, label, item }: { key: string, label: string, item: string | object }) {
  return ( typeof item === 'string' ? 
    <MenuItem icon={<TextSnippetOutlinedIcon />} key={key} component={<Link href={item}/>}>
      {toTitleCase(label)}
    </MenuItem> : 
    <SubMenu icon={<AddIcon />} label={toTitleCase(label)}>
      {Object.entries(item).map(([itemLabel, itemValue]) => (
        <CreateSubMenu key={`${key}-${itemLabel}`} label={itemLabel} item={itemValue} />
        ))}
    </SubMenu>);
}
