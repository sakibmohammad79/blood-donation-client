import { Box, Grid, Card, CardContent, Typography, Container } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import TapasIcon from "@mui/icons-material/Tapas";

const tips = [
  {
    category: "Before Donation",
    tips: [
      {
        icon: <WaterDropIcon fontSize="large" sx={{ color: "red" }} />,
        title: "Stay Hydrated",
        description:
          "Drink plenty of water before your donation to stay hydrated.",
      },
      {
        icon: <FoodBankIcon fontSize="large" sx={{ color: "red" }} />,
        title: "Eat a Healthy Meal",
        description:
          "Have a nutritious meal before donating. Avoid fatty foods.",
      },
    ],
  },
  {
    category: "During Donation",
    tips: [
      {
        icon: <CheckroomIcon fontSize="large" sx={{ color: "red" }} />,
        title: "Wear Comfortable Clothes",
        description: "Wear sleeves that can be easily rolled up.",
      },
      {
        icon: <SelfImprovementIcon fontSize="large" sx={{ color: "red" }} />,
        title: "Relax",
        description: "Take deep breaths and relax during the donation.",
      },
    ],
  },
  {
    category: "After Donation",
    tips: [
      {
        icon: (
          <AirlineSeatIndividualSuiteIcon
            fontSize="large"
            sx={{ color: "red" }}
          />
        ),
        title: "Rest",
        description: "Sit and relax for a few minutes post-donation.",
      },
      {
        icon: <TapasIcon fontSize="large" sx={{ color: "red" }} />,
        title: "Snack",
        description: "Enjoy a light snack and drink to replenish your energy.",
      },
    ],
  },
];

const DonationTips = () => {
  return (
    <Container>
    <Box  pb={8} textAlign="center">
    <Typography
            sx={{
              fontSize: { xs: 25, sm: 30, md: 35, lg: 45 },
            }}
            fontWeight={600}
          >
          DONATION TIPS
          </Typography>
      <Typography variant="body1" gutterBottom>
        Here are some helpful tips to ensure a smooth and positive blood
        donation experience.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Follow these guidelines before, during, and after your donation
      </Typography>
      <Box>
        {tips.map((section) => (
          <Box key={section.category} marginTop={4}>
            <Typography variant="h5" gutterBottom>
              {section.category}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {section.tips.map((tip, index) => (
                <Grid item xs={12} sm={12} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Box>
                        {tip?.icon}
                        <Typography
                          variant="h6"
                          py={1}
                          style={{ marginLeft: 8 }}
                        >
                          {tip?.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        {tip?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
    </Container>
  );
};

export default DonationTips;
