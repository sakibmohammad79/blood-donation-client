import galleryImage1 from "@/assets/landing_page/gallery/gallery_1-300x222.jpg";
import galleryImage2 from "@/assets/landing_page/gallery/gallery_4.jpg";
import galleryImage3 from "@/assets/landing_page/gallery/gallery_5-300x222.jpg";
import galleryImage4 from "@/assets/landing_page/gallery/gallery_5.jpg";
import galleryImage5 from "@/assets/landing_page/gallery/gallery_6.jpg";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
const Gallery = () => {
  const images = [
    galleryImage1,
    galleryImage2,
    galleryImage5,
    galleryImage3,
    galleryImage4,
    galleryImage5,
  ];
  return (
    <Container>
      <Box py={16}>
        <Box pb={8} textAlign="center">
          <Typography variant="h4" component="h4" fontWeight={600}>
            CAMPAIGN GALLERY
          </Typography>
          <Typography>
            Our prestigious voluntary work on campaigns by the team
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <Image
                  height={400}
                  width={400}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Gallery;
