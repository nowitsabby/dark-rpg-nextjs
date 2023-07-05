'use client'

import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import { Link } from 'react-scroll';
import {
  Menu,
  MenuItem,
  Sidebar,
  sidebarClasses,
  SubMenu,
} from 'react-pro-sidebar';
import { useState } from "react";

export default function TocSidebar({ toc }: 
{ 
  toc: {
    level: number;
    id: string;
    title: string;
  }[]
}) {
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
          icon={<TocOutlinedIcon />}
          onClick={() => {
            setCollapsed(!collapsed)
          }}
          style={{ textAlign: "center" }}
        >
          Contents
        </MenuItem>
        <GenerateToc toc={toc} />
      </Menu>
    </Sidebar>
  );
}

function GenerateToc({ toc }: 
  { 
    toc: {
      level: number;
      id: string;
      title: string;
    }[]
  }) {
  return (
    toc.map(({ level, id, title }) => (
      <MenuItem style={{ marginLeft: `${(level - 1) * 8}px` }} icon={<ArrowLeftOutlinedIcon />} key={id} component={<Link to={id}/>}>
        {title}
      </MenuItem>
    ))
  )
};
