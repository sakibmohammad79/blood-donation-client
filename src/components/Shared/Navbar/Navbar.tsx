import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <Container>
      <Stack
        py={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
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
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography component={Link} href="/">
            Home
          </Typography>
          <Typography component={Link} href="/">
            About Us
          </Typography>
          <Typography component={Link} href="/">
            Profile
          </Typography>
        </Stack>

        <Button component={Link} href="/login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
