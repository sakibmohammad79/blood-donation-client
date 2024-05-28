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
        minHeight: "100vh", // Adjust as needed
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white", // Ensure text is readable
        filter: "brightness(0.8)",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignContent="center"
        textAlign="center"
      >
        <Typography variant="h3" component="h3" fontWeight={600}>
          DONATE BLOOD AND GET REAL BLESSINGS.
        </Typography>
        <Typography variant="h5" component="h5" pt={1}>
          Blood is the most precious gift that anyone can give to another
          person.
        </Typography>
        <Typography variant="h5" component="h5">
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
