import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";

import Link from "next/link";

import { useEffect, useState } from "react";
import SidebarItem from "./SideItem";

import { UserRole } from "@/types/common";
import { drawerItems } from "@/utils/generateSidebarItems";
import { getuserInfo } from "@/services/authService";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const { role } = getuserInfo() as any;

    setUserRole(role);
  }, []);

  return (
    <Box sx={{ height: "100%", background: "#242424", color: "white" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={1}
        py={1}
        gap={1}
        component={Link}
        href={"/"}
      >
        {/* <Image src={assets.svgs.logo} alt="logo" height={40} width={40} /> */}
        <Typography variant="h5" component="h5" fontWeight={500}>
          <Box component="span" color="primary.main">
            {" "}
            BLOOD
          </Box>{" "}
          CARE
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
