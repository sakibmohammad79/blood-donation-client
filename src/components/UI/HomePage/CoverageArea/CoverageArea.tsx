import Map from "@/components/Map/Map";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Box pb={8} textAlign="center">
        <Typography variant="h4" component="h4" fontWeight={600}>
          Our Blood Donation Coverage Area
        </Typography>
        <Typography>
          Explore our map below to find the nearest blood donation center.
        </Typography>
      </Box>
      <Map />
    </Box>
  );
}
