import { Box, Container, Grid, Stack, Typography } from "@mui/material";

const History = () => {
  return (
    <Container sx={{ my: 12 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        boxShadow={1}
        padding={6}
        borderRadius={4}
        color="white"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(202, 0, 0), rgb(230, 0, 0))",
          backgroundSize: "100% 100%",
        }}
      >
        <Grid item sm={12} md={6} lg={3} textAlign="center">
          <Typography variant="h3" component="h6">
            30+
          </Typography>
          <Typography variant="h6" component="h6">
            Expert Volunteers
          </Typography>
        </Grid>
        <Grid item sm={12} md={6} lg={3} textAlign="center">
          <Typography variant="h3" component="h6">
            130+
          </Typography>
          <Typography variant="h6" component="h6">
            Blood Donors
          </Typography>
        </Grid>
        <Grid item sm={12} md={6} lg={3} textAlign="center">
          <Typography variant="h3" component="h6">
            120+
          </Typography>
          <Typography variant="h6" component="h6">
            Happy Patients
          </Typography>
        </Grid>
        <Grid item sm={12} md={6} lg={3} textAlign="center">
          <Typography variant="h3" component="h6">
            150+
          </Typography>
          <Typography variant="h6" component="h6">
            Best Award Winners
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default History;
