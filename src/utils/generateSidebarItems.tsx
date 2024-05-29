import DashboardIcon from "@mui/icons-material/Dashboard";
import HealingIcon from "@mui/icons-material/Healing";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { DrawerItems, UserRole } from "@/types/common";
import { USER_ROLE } from "@/constant/role";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const drawerItems = (role: UserRole) => {
  const roleMenus: DrawerItems[] = [];

  const deafaultMenus = [
    {
      title: "Profile",
      path: `${role}/profile`,
      icon: AccountCircleIcon,
    },
    {
      title: "Password Change",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];
  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Donor",
          path: `${role}/manage-donor`,
          icon: Diversity1Icon,
        },
        {
          title: "Manage Admin",
          path: `${role}/manage-admin`,
          icon: AdminPanelSettingsIcon,
        }
      );
      break;
    case USER_ROLE.DONOR:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "All Donor",
          path: `${role}/all-donors`,
          icon: Diversity1Icon,
        },
        {
          title: "My Request",
          path: `${role}/my-request`,
          icon: CallMadeIcon,
        },
        {
          title: "Request Me",
          path: `${role}/request-me`,
          icon: CallReceivedIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus, ...deafaultMenus];
};
