import Map from "@/components/Map/Map";
import { Box, Typography } from "@mui/material";
import Head from "next/head";

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
      {/* <Head>
        <title>Blood Donation Coverage Area</title>
        <meta
          name="description"
          content="Map showing blood donation coverage areas."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Blood Donation Coverage Area</h1>
        <Map />
      </main> */}
      <Map />
    </Box>
  );
}
