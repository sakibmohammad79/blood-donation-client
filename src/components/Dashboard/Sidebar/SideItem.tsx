import { DrawerItems } from "@/types/common";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";

import { usePathname } from "next/navigation";

export type IProps = {
  item: DrawerItems;
};

const SidebarItem = ({ item }: IProps) => {
  const pathName = usePathname();
  const linkPath = `/dashboard/${item.path}`;
  return (
    <Link href={linkPath}>
      <ListItem
        sx={{
          ...(pathName === linkPath
            ? {
                borderRight: "3px solid red",
                "& svg": {
                  color: "primary.main",
                },
              }
            : {}),
          mb: 1,
        }}
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            {item?.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ color: "white" }}>{item.title}</Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
