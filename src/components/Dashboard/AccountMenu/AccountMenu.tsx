import * as React from "react";
import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/navigation";
import { getuserInfo, removeUser } from "@/services/authService";
import Link from "next/link";
import { deleteCookies } from "@/services/actions/deleteCoockie";
import { authKey } from "@/constant";
import { Stack, Typography } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";

export default function AccountMenu() {
  const [userRole, setUserRole] = React.useState("");
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    removeUser();
    deleteCookies([authKey]);
    router.push("/");
  };

  React.useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setUserRole(userInfo?.role);
    }
  }, [userRole]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <KeyboardArrowDownIcon
              sx={{ background: "white", borderRadius: "50%" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href="/">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            Home
          </MenuItem>
        </Link>
        <Link href={`/dashboard/${userRole}/profile`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonPinIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
