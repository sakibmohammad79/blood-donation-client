"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import volunteersImage1 from "@/assets/landing_page/volunteers/volunteers_1.jpg";
import volunteersImage2 from "@/assets/landing_page/volunteers/volunteers_2.jpg";
import volunteersImage3 from "@/assets/landing_page/volunteers/team_9.jpg";
import facebookIcon from "@/assets/landing_page/facebook.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import Image from "next/image";
import Link from "next/link";

const volunteersData = [
  {
    id: 1,
    name: "Alexender Gray",
    role: "Founder",
    image: volunteersImage1,
  },
  {
    id: 2,
    name: "Jennifer Lopez",
    role: "Co-Founder",
    image: volunteersImage2,
  },
  {
    id: 3,
    name: "Michael Smith",
    role: "Team Lead",
    image: volunteersImage3,
  },
];

const Volunteers = () => {
  return (
    <Box sx={{ background: "#F9FAFB", py: 16 }}>
      <Container>
        <Box textAlign="center" pb={8}>
          <Typography
            sx={{
              fontSize: { xs: 25, sm: 30, md: 35, lg: 45 },
            }}
            fontWeight={600}
          >
            OUR VOLUNTEERS
          </Typography>
          <Typography>
            The volunteers who give their time and talents help to fulfill our mission.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {volunteersData.map((volunteer) => (
            <Grid item key={volunteer.id} xs={12} sm={6} md={6} lg={4}>
              <Card
                sx={{
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardActionArea>
                  <Box sx={{ width: "100%", overflow: "hidden" }}>
                    <Image
                      src={volunteer.image}
                      alt={volunteer.name}
                      width={500}
                      height={350}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={600}>
                      {volunteer.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {volunteer.role}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{
                    justifyContent: "center",
                    gap: 2,
                    pb: 2,
                  }}
                >
                  <Link href="/facebook">
                    <Image alt="facebook" height={30} width={30} src={facebookIcon} />
                  </Link>
                  <Link href="/linkedIn">
                    <Image alt="linkedIn" height={30} width={30} src={linkedinIcon} />
                  </Link>
                  <Link href="/Instagram">
                    <Image alt="instagram" height={30} width={30} src={instagramIcon} />
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Volunteers;
