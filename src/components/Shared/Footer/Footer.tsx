import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="white" component={Link} href="/consultation">
            Home
          </Typography>
          <Typography color="white" component={Link} href="/healthplans">
            Health Plans
          </Typography>
          <Typography color="white" component={Link} href="/medicine">
            About
          </Typography>
          <Typography color="white" component={Link} href="/diagonistics">
            Profile
          </Typography>
          <Typography color="white" component={Link} href="/ngos">
            NGOs
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" gap={2} py={3}>
          <Link href="/facebook">
            <Image
              alt="facebook"
              height={30}
              width={30}
              src={facebookIcon}
            ></Image>
          </Link>

          <Link href="/linkedin">
            <Image
              alt="linkedin"
              height={30}
              width={30}
              src={linkedinIcon}
            ></Image>
          </Link>
          <Link href="/instagram">
            <Image
              alt="instagram"
              height={30}
              width={30}
              src={instagramIcon}
            ></Image>
          </Link>
          <Link href="/twitter">
            <Image
              alt="twitter"
              height={30}
              width={30}
              src={twitterIcon}
            ></Image>
          </Link>
        </Stack>
        <Box sx={{ border: "1px dashed lightgray" }}></Box>
        <Stack
          direction="row"
          py={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="p" color="white">
            &copy;2024 Blood Care. All Rights Reserved.
          </Typography>
          <Typography
            color="primary.main"
            variant="h5"
            component={Link}
            href="/"
            fontWeight={600}
          >
            BLOOD{" "}
            <Box component="span" color="white">
              CARE
            </Box>{" "}
          </Typography>
          <Typography component="p" color="white">
            Blood Care. Terms & Conditions.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
