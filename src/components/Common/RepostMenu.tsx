import { RateReview, RepeatOutlined } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { RefObject } from "react";

const styles = {
  icon: { color: "black.main" },
  menu: { borderRadius: 2 },
  menuList: { padding: 0 },
  menuItem: { paddingX: 1.5, paddingY: 1 },
};

type RepostMenuProps = {
  isReposted: boolean;
  anchorRef: RefObject<HTMLButtonElement>;
  open: boolean;
  setCloseMenu: () => void;
  handleRepost: () => void;
};

const RepostMenu = ({
  isReposted,
  anchorRef,
  open,
  setCloseMenu,
  handleRepost,
}: RepostMenuProps) => {
  return (
    <Menu
      anchorEl={anchorRef.current}
      MenuListProps={{ sx: styles.menuList }}
      onClose={setCloseMenu}
      open={open}
      slotProps={{
        paper: {
          sx: styles.menu,
        },
      }}
    >
      <MenuItem
        onClick={() => {
          handleRepost();
          setCloseMenu();
        }}
        sx={styles.menuItem}
      >
        <ListItemIcon>
          <RepeatOutlined sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
          {isReposted ? "Undo repost" : "Repost"}
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={setCloseMenu} sx={styles.menuItem}>
        <ListItemIcon>
          <RateReview sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
          Quote Post
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default RepostMenu;
