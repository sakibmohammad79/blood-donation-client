"use client";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Donor = () => {
  const { data } = useGetAllDonorsQuery({});
  const allDonor = data?.donor;

  return (
    <Container maxWidth="xl" sx={{ pt: 16 }}>
      <Box pb={6} textAlign="center">
        <Typography
          sx={{ fontSize: { xs: 25, sm: 30, md: 40, lg: 45 } }}
          fontWeight={600}
        >
          JOIN WITH US AND SAVE LIFE
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Become A Part Of Great Work Today
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {allDonor?.map((donor: any) => (
          <Grid key={donor?.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                boxShadow: 3,
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 250, // Set a fixed height for the image section
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={
                    donor?.photo ||
                    "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
                  }
                  alt="donorImage"
                  layout="fill"
                  objectFit="cover" // Ensure the image covers the box proportionally
                  priority
                />
              </Box>

              <CardContent
                sx={{
                  flex: 1,
                  padding: 3,
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#f9f9f9", // Add a background color for better readability
                }}
              >
                <Typography variant="h6" fontWeight={600} color="primary">
                  {donor?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Blood Type:{" "}
                  <Box color="text.primary" component="span">
                    {donor?.bloodType}
                  </Box>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Availability:{" "}
                  <Box color={donor?.availability ? "green" : "red"} component="span">
                    {donor?.availability ? "Available" : "Unavailable"}
                  </Box>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Location:{" "}
                  <Box color="text.primary" component="span">
                    {donor?.location}
                  </Box>
                </Typography>

                <Box mt={2} textAlign="center">
                  <Link href={`/donor/${donor.id}`} passHref>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        px: 3,
                        py: 1.5,
                        fontSize: 16,
                        backgroundColor: "#d32f2f", // Red button
                        "&:hover": {
                          backgroundColor: "#c62828", // Darker red on hover
                        },
                      }}
                    >
                      More
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Donor;
