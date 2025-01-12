import { RateReview, RepeatOutlined } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { RefObject, useState } from "react";
import { useAppDispatch } from "../../state/hooks";
import { toggleRepost } from "../../state/slices/postsSlice";

const styles = {
  icon: { color: "black.main" },
  menu: { borderRadius: 2 },
  menuList: { padding: 0 },
  menuItem: { paddingX: 1.5, paddingY: 1 },
};

type RepostMenuProps = {
  postId: number;
  isReposted: boolean;
  ref: RefObject<HTMLButtonElement>;
  open: boolean;
  setCloseMenu: () => void;
};

const RepostMenu = ({
  postId,
  isReposted,
  ref,
  open,
  setCloseMenu,
}: RepostMenuProps) => {
  const dispatch = useAppDispatch();

  const handleRepost = async () => {
    dispatch(toggleRepost(postId));
    setCloseMenu();
  };

  return (
    <Menu
      anchorEl={ref.current}
      open={open}
      onClose={setCloseMenu}
      slotProps={{
        paper: {
          sx: styles.menu,
        },
      }}
      MenuListProps={{ sx: styles.menuList }}
    >
      <MenuItem sx={styles.menuItem} onClick={handleRepost}>
        <ListItemIcon>
          <RepeatOutlined sx={styles.icon} />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
          {isReposted ? "Undo repost" : "Repost"}
        </ListItemText>
      </MenuItem>
      <MenuItem sx={styles.menuItem} onClick={setCloseMenu}>
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
