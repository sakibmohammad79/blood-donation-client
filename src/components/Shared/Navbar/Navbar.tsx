"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import { Stack } from "@mui/material";
import Link from "next/link";
import { getuserInfo } from "@/services/authService";
import dynamic from "next/dynamic";

const AuthButton = dynamic(
  () => import("@/components/UI/AuthButton/AuthButton"),
  { ssr: false }
);

function ResponsiveAppBar() {
  const [userRole, setUserRole] = React.useState("");
  React.useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setUserRole(userInfo?.role);
    }
  }, [userRole]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ py: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOOD CARE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                gap={2}
                p={2}
              >
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
                {userRole && (
                  <Typography
                    component={Link}
                    href={`/dashboard/${userRole}`}
                    fontWeight={600}
                  >
                    DASHBOARD
                  </Typography>
                )}
              </Stack>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Stack
              color="white"
              direction="row"
              justifyContent="space-between"
              gap={2}
              p={2}
            >
              <Typography
                color="white"
                component={Link}
                href="/"
                fontWeight={600}
              >
                HOME
              </Typography>
              <Typography
                color="white"
                component={Link}
                href="/about"
                fontWeight={600}
              >
                ABOUT
              </Typography>
              <Typography
                color="white"
                component={Link}
                href="/serviceprovided"
                fontWeight={600}
              >
                SERVICE
              </Typography>

              {userRole && (
                <Typography
                  color="white"
                  component={Link}
                  href={`/dashboard/${userRole}/profile`}
                  fontWeight={600}
                >
                  PROFILE
                </Typography>
              )}
               {userRole && (
                  <Typography
                  color="white"
                    component={Link}
                    href={`/dashboard/${userRole}`}
                    fontWeight={600}
                  >
                    DASHBOARD
                  </Typography>
                )}
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <AuthButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
