import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://i.postimg.cc/C12N0QmW/home-1-slider-1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        filter: "brightness(0.8)",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignContent="center"
        textAlign="center"
      >
        <Typography
          sx={{
            fontSize: { xs: 30, sm: 30, md: 40, lg: 60, xl: 60 },
            color: "white",
          }}
          fontWeight={600}
        >
          DONATE BLOOD AND GET REAL BLESSINGS.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 16, sm: 16, md: 18, lg: 20, xl: 20 },
            color: "white",
          }}
          pt={1}
        >
          Blood is the most precious gift that anyone can give to another
          person.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 16, sm: 16, md: 18, lg: 20, xl: 20 },
            color: "white",
          }}
        >
          Donating blood not only saves the life also save donor’s lives.
        </Typography>
        <Box pt={2} component={Link} href="/all-donor">
          <Button>Get Donor</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default HeroSection;
