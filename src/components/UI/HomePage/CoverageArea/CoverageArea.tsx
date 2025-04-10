import Map from "@/components/Map/Map";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      {/* <Box pb={8} textAlign="center">
        <Typography
          sx={{
            fontSize: { xs: 30, sm: 30, md: 40, lg: 45, xl: 45 },
          }}
          fontWeight={600}
        >
          Our Blood Donation Area
        </Typography>
        <Typography>
          Explore our map below to find the nearest blood donation center.
        </Typography>
      </Box> */}
      <Map />
    </Box>
  );
}
