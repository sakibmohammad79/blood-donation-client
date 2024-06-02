"use server";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Donor = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor/all-donor`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  const { data: allDonor } = await res.json();

  return (
    <Box py={16}>
      <Box pb={8} textAlign="center">
        <Typography variant="h4" component="h4" fontWeight={600}>
          JOIN WITH US AND SAVE LIFE
        </Typography>
        <Typography>Become A Part Of Great Work Today</Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ p: 8 }}>
        {allDonor?.map((donor: any) => (
          <Grid key={donor?.id} item>
            <Card
              sx={{
                display: "flex",
                height: "250px",
                width: "600px",
              }}
            >
              <Box>
                <Image
                  //src={donor?.photo}
                  src={
                    donor?.photo ||
                    "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
                  }
                  alt="donotImage"
                  height={140}
                  width={220}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: 2,
                }}
              >
                <Box>
                  <Typography variant="h6">
                    Name:{" "}
                    <Box color="text.secondary" component="span">
                      {donor?.name}
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    Blood Type:{" "}
                    <Box color="text.secondary" component="span">
                      {donor?.bloodType}
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    Availability:{" "}
                    <Box color="text.secondary" component="span">
                      {donor?.availability == true ? "True" : "False"}
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6">
                    Location:{" "}
                    <Box
                      // variant="subtitle1"
                      color="text.secondary"
                      component="span"
                    >
                      {donor?.location}
                    </Box>
                  </Typography>
                  <Box mt={2} component={Link} href={`/donor/${donor.id}`}>
                    <Button style={{ padding: "8px 12px", fontSize: "16px" }}>
                      More
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Donor;
