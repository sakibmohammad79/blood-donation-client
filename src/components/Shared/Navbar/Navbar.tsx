"use client";

import { getuserInfo } from "@/services/authService";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  const userInfo = getuserInfo();

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

          {userInfo?.role && (
            <Typography
              component={Link}
              href={`/dashboard/${userInfo?.role}/profile`}
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
