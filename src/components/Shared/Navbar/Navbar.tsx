// "use client";

// import { getuserInfo } from "@/services/authService";
// import { Box, Container, Stack, Typography } from "@mui/material";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const AuthButton = dynamic(
//     () => import("@/components/UI/AuthButton/AuthButton"),
//     { ssr: false }
//   );

//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     const userInfo = getuserInfo();
//     if (userInfo) {
//       setUserRole(userInfo?.role);
//     }
//   }, [userRole]);

//   return (
//     <Container>
//       <Stack
//         py={2}
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Box component={Link} href="/">
//           <Typography
//             fontWeight={600}
//             variant="h4"
//             color="primary.main"
//             component="h1"
//           >
//             BlOOD{" "}
//             <Box component="span" color="black">
//               CARE
//             </Box>
//           </Typography>
//         </Box>
//         <Stack direction="row" justifyContent="space-between" gap={4}>
//           <Typography component={Link} href="/" fontWeight={600}>
//             HOME
//           </Typography>
//           <Typography component={Link} href="/about" fontWeight={600}>
//             ABOUT
//           </Typography>

//           {userRole && (
//             <Typography
//               component={Link}
//               href={`/dashboard/${userRole}/profile`}
//               fontWeight={600}
//             >
//               PROFILE
//             </Typography>
//           )}
//         </Stack>

//         <AuthButton />
//       </Stack>
//     </Container>
//   );
// };

// export default Navbar;

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
import AdbIcon from "@mui/icons-material/Adb";
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
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
              </Stack>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOOD CARE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Stack direction="row" justifyContent="space-between" gap={2} p={2}>
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
