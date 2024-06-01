import {
  Box,
  Button,
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
import Image from "next/image";
import facebookIcon from "@/assets/landing_page/facebook.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import Link from "next/link";

const Volunteers = () => {
  return (
    <Box
      sx={{
        background: "#F9FAFB",
      }}
      py={16}
    >
      <Container>
        <Box pb={8} textAlign="center">
          <Typography variant="h4" component="h4" fontWeight={600}>
            OUR VOLUNTEERS
          </Typography>
          <Typography>
            The volunteers who give their time and talents help to fulfill our
            mission.
          </Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item sm={12} md={6} lg={4}>
            <Card>
              <CardActionArea>
                <Image
                  src={volunteersImage1}
                  height={600}
                  width={500}
                  alt="volunteersImage"
                ></Image>
                <CardContent
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Alexender Gray
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Founder
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{ direction: "row", justifyContent: "center", py: 2 }}
              >
                <Link href="/facebook">
                  <Image
                    alt="facebook"
                    height={30}
                    width={30}
                    src={facebookIcon}
                  ></Image>
                </Link>
                <Link href="/linkedIn">
                  <Image
                    alt="linkedIn"
                    height={30}
                    width={30}
                    src={linkedinIcon}
                  ></Image>
                </Link>
                <Link href="/Instagram">
                  <Image
                    alt="instagram"
                    height={30}
                    width={30}
                    src={instagramIcon}
                  ></Image>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <Card>
              <CardActionArea>
                <Image
                  height={600}
                  width={500}
                  src={volunteersImage2}
                  alt="volunteersImage"
                ></Image>
                <CardContent
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Alexender Gray
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Founder
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{ direction: "row", justifyContent: "center", py: 2 }}
              >
                <Link href="/facebook">
                  <Image
                    alt="facebook"
                    height={30}
                    width={30}
                    src={facebookIcon}
                  ></Image>
                </Link>
                <Link href="/linkedIn">
                  <Image
                    alt="linkedIn"
                    height={30}
                    width={30}
                    src={linkedinIcon}
                  ></Image>
                </Link>
                <Link href="/Instagram">
                  <Image
                    alt="instagram"
                    height={30}
                    width={30}
                    src={instagramIcon}
                  ></Image>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <Card>
              <CardActionArea>
                <Image
                  src={volunteersImage3}
                  height={600}
                  width={500}
                  alt="volunteersImage"
                ></Image>
                <CardContent
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Alexender Gray
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Founder
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{ direction: "row", justifyContent: "center", py: 2 }}
              >
                <Link href="/facebook">
                  <Image
                    alt="facebook"
                    height={30}
                    width={30}
                    src={facebookIcon}
                  ></Image>
                </Link>
                <Link href="/linkedIn">
                  <Image
                    alt="linkedIn"
                    height={30}
                    width={30}
                    src={linkedinIcon}
                  ></Image>
                </Link>
                <Link href="/Instagram">
                  <Image
                    alt="instagram"
                    height={30}
                    width={30}
                    src={instagramIcon}
                  ></Image>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Volunteers;
