"use server";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";

const Donor = async () => {
  const res = await fetch("http://localhost:5000/api/v1/donor", {
    next: {
      revalidate: 30,
    },
  });

  const { data: allDonor } = await res.json();
  console.log(allDonor);

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
              }}
            >
              <Box>
                <Image
                  src={donor?.photo}
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
                  <Box pt={1}>
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
