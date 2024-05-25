import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HealingIcon from "@mui/icons-material/Healing";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { DrawerItems, UserRole } from "@/types/common";
import { USER_ROLE } from "@/constant/role";

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
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: GroupIcon,
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
          icon: HealingIcon,
        },
        {
          title: "My Request",
          path: `${role}/my-request`,
          icon: HealingIcon,
        },
        {
          title: "Request Me",
          path: `${role}/request-me`,
          icon: HealingIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus, ...deafaultMenus];
};
