"use client";

import { getuserInfo } from "@/services/authService";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setUserRole(userInfo?.role);
    }
  }, [userRole]);

  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box component={Link} href="/">
          <Typography
            fontWeight={600}
            variant="h4"
            color="primary.main"
            component="h1"
          >
            BlOOD{" "}
            <Box component="span" color="black">
              CARE
            </Box>
          </Typography>
        </Box>
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography component={Link} href="/" fontWeight={600}>
            HOME
          </Typography>
          <Typography component={Link} href="/about" fontWeight={600}>
            ABOUT
          </Typography>

          {userRole && (
            <Typography
              component={Link}
              href={`/dashboard/${userRole}/profile`}
              fontWeight={600}
            >
              PROFILE
            </Typography>
          )}
        </Stack>

        <AuthButton />
      </Stack>
    </Container>
  );
};

export default Navbar;
