import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { PATHS } from "@/app/routes/paths";
import type { RouteMeta } from "@/app/routes/types";
import logo from "@/assets/logo.jpg";

type Props = {
  open: boolean;
  width: number;
  collapsedWidth: number;
  headerHeight: number;
  onToggle: () => void;
};

const Sidebar = ({
  open,
  width,
  collapsedWidth,
  headerHeight,
  onToggle,
}: Props) => {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? width : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? width : collapsedWidth,
          top: 0,
          height: "100vh",
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Toggle button trên cùng */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          height: `${headerHeight}px`,
          px: 1,
          flexShrink: 0,
        }}
      >
        {open && (
          <Box sx={{ width: 150, height: "auto" }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}
        <IconButton onClick={onToggle}>
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* Menu items chiếm phần còn lại */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {PATHS.filter((r: RouteMeta) => !r.hidden).map((r: RouteMeta) => (
            <ListItemButton
              key={r.key}
              component={NavLink}
              to={r.path}
              sx={{
                justifyContent: open ? "initial" : "center",
                background: location.pathname.startsWith(r.pathOriginal)
                  ? "#c5cdd83b"
                  : "",
              }}
            >
              {r.icon && (
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : "auto" }}>
                  {r.icon}
                </ListItemIcon>
              )}
              {open && <ListItemText primary={r.label} />}
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
