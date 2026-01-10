import { AppBar, Toolbar } from "@mui/material";

import styles from "./_header.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {
  height: number;
  sidebarWidth: number;
};

const Header = ({ height, sidebarWidth }: Props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        left: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        height: `${height}px`,
        transition: "width 0.3s, left 0.3s",
      }}
    >
      <Toolbar sx={{ minHeight: `${height}px !important` }}>
        <div className={styles.headerContent}>
          <div className={styles.headerContent__name}>Vũ Văn Thanh</div>
          <div className={styles.headerContent__logout}>
            <LogoutIcon sx={{ mr: 1 }} onClick={() => {}} />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
