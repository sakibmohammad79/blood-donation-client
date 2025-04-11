"use client"
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
  Skeleton,
  Button,
} from "@mui/material";
import facebookIcon from "@/assets/landing_page/facebook.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import Image from "next/image";
import Link from "next/link";
import { useGetAllVolunteerQuery } from "@/redux/api/volunteerApi";

const Volunteers = () => {
  const { data: volunteers, isLoading } = useGetAllVolunteerQuery({});
  const volunteerData = volunteers?.volunteer;

  return (
    <Box sx={{ py: 16 }}>
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
          {isLoading ? (
            Array.from(new Array(3)).map((_, i) => (
              <Grid item key={i} xs={12} sm={6} md={6} lg={4}>
                <Skeleton variant="rectangular" height={350} />
              </Grid>
            ))
          ) : (
            volunteerData?.map((volunteer: any) => (
              <Grid item key={volunteer.id} xs={12} sm={6} md={6} lg={4}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea>
                    <Box sx={{ width: "100%", height: 500, overflow: "hidden" }}>
                      <Image
                        src={volunteer.photo || "/default-user.jpg"}
                        alt={volunteer.name || "Volunteer"}
                        width={500}
                        height={300}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center", mt: 3 }}>
                      <Typography variant="h5" fontWeight={600}>
                        {volunteer.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {volunteer.role || "Volunteer"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        📍 {volunteer.location || "Unknown location"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📧 {volunteer.email || "No email"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📞 {volunteer.contactNumber || "No contact"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
                    {volunteer.facebook && (
                      <Link href={volunteer.facebook} target="_blank">
                        <Image alt="facebook" height={30} width={30} src={facebookIcon} />
                      </Link>
                    )}
                    {volunteer.linkedin && (
                      <Link href={volunteer.linkedin} target="_blank">
                        <Image alt="linkedin" height={30} width={30} src={linkedinIcon} />
                      </Link>
                    )}
                    {volunteer.instagram && (
                      <Link href={volunteer.instagram} target="_blank">
                        <Image alt="instagram" height={30} width={30} src={instagramIcon} />
                      </Link>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

   
        
      </Container>
    </Box>
  );
};

export default Volunteers;
