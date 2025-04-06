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
    <Container sx={{ py: 10 }}>
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
          <Grid key={donor?.id} item xs={12} sm={12} md={6}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "100%", md: 200 },
                  height: { xs: 200, md: 160 },
                  flexShrink: 0,
                }}
              >
                <Image
                  src={
                    donor?.photo ||
                    "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
                  }
                  alt="donorImage"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">
                  Name:{" "}
                  <Box color="text.secondary" component="span">
                    {donor?.name}
                  </Box>
                </Typography>
                <Typography variant="h6">
                  Blood Type:{" "}
                  <Box color="text.secondary" component="span">
                    {donor?.bloodType}
                  </Box>
                </Typography>
                <Typography variant="h6">
                  Availability:{" "}
                  <Box color="text.secondary" component="span">
                    {donor?.availability ? "Available" : "Unavailable"}
                  </Box>
                </Typography>
                <Typography variant="h6">
                  Location:{" "}
                  <Box color="text.secondary" component="span">
                    {donor?.location}
                  </Box>
                </Typography>

                <Box mt={2}>
                  <Link href={`/donor/${donor.id}`} passHref>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        px: 3,
                        py: 1,
                        fontSize: 16,
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
