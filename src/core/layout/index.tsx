import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./header.layout";
import Sidebar from "./sidebar.layout";

const fullDrawerWidth = 240;
const collapsedDrawerWidth = 60;
const headerHeight = 80;

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const sidebarWidth = open ? fullDrawerWidth : collapsedDrawerWidth;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        open={open}
        width={fullDrawerWidth}
        collapsedWidth={collapsedDrawerWidth}
        headerHeight={headerHeight}
        onToggle={() => setOpen((v) => !v)}
      />

      {/* Main area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Header height={headerHeight} sidebarWidth={sidebarWidth} />

        {/* Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            background: "#f5f5f5",
            mt: `${headerHeight}px`,
            transition: "margin 0.3s, width 0.3s",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
