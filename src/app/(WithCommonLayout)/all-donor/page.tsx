"use client";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const AllDonorPage = () => {


  const { data } = useGetAllDonorsQuery({});
  const allDonor = data?.donor;

  return (
    <Container sx={{ py: 16 }}>
      <Box pb={8} textAlign="center">
        <Typography
          sx={{ fontSize: { xs: 25, sm: 25, md: 30, lg: 45, xl: 45 } }}
          fontWeight={600}
        >
          JOIN WITH US AND SAVE LIFE
        </Typography>
        <Typography>Become A Part Of Great Work Today</Typography>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{ px: { xs: 2, sm: 2, md: 2, lg: 4 } }}
        justifyContent="center"
        alignItems="center"
      >
        {allDonor?.map((donor: any) => (
          <Grid key={donor?.id} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card
              sx={{
                display: { xs: "col", sm: "col", md: "flex", lg: "flex" },
              }}
            >
              <Box>
                <Image
                  src={
                    donor?.photo ||
                    "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
                  }
                  alt="donorImage"
                  height={120}
                  width={200}
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
    </Container>
  );
};

export default AllDonorPage;
