"use client";

import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import Image from "next/image";

const About = () => {
  return (
    <Box sx={{ py: 12, backgroundColor: "#f9f9f9" }}>
      <Container>
        {/* Heading */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            About Us
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Empowering communities through blood donation and dedicated volunteering
          </Typography>
        </Box>

        {/* Our Mission */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Our mission is to create a unified platform that connects blood donors, recipients, and passionate volunteers.
              We strive to ensure timely help, encourage community engagement, and save lives through responsible and transparent services.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                margin: "0 auto",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <Image
                src="https://i.postimg.cc/85hJH3yt/pexels-liza-summer-6347727.jpg"
                width={450}
                height={300}
                alt="Our mission"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Who We Are */}
        <Box my={10}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We are a passionate team of developers, health professionals, and everyday heroes who believe that no life should be lost due to a shortage of blood.
            By leveraging technology and human compassion, we built this platform to make blood donation easier, faster, and more accessible for everyone in Bangladesh and beyond.
          </Typography>
        </Box>

        {/* Why Volunteer */}
        <Box my={10}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Why Become a Volunteer?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            Volunteers are the heart of our mission. By joining us, you will:
          </Typography>
          <Box component="ul" sx={{ pl: 3, color: "text.secondary", lineHeight: 2 }}>
            <li>Help save lives directly and indirectly</li>
            <li>Gain valuable experience and grow your leadership skills</li>
            <li>Be part of a growing, meaningful movement</li>
            <li>Make a real difference in your community</li>
          </Box>
        </Box>

        {/* Stats / Impact */}
        <Box mt={10}>
          <Grid container spacing={4}>
            {[
              { title: "5,000+", subtitle: "Registered Donors" },
              { title: "1,200+", subtitle: "Successful Donations" },
              { title: "300+", subtitle: "Active Volunteers" },
              { title: "100+", subtitle: "Cities Covered" },
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Paper
                  elevation={4}
                  sx={{
                    py: 5,
                    textAlign: "center",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#666", mt: 1 }}>
                    {item.subtitle}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
