import { Container, Grid, Typography } from "@mui/material";

const History = () => {
  return (
    <Container sx={{ mt: 6, mb: 16 }}>
      <Grid
        container
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
        <Grid item pb={2} xs={12} sm={12} md={6} lg={3} textAlign="center">
          <Typography variant="h3" component="h6">
            30+
          </Typography>
          <Typography variant="h6" component="h6">
            Expert Volunteers
          </Typography>
        </Grid>
        <Grid item pb={2} xs={12} sm={12} md={6} lg={3} textAlign="center">
          <Typography variant="h3" component="h6">
            130+
          </Typography>
          <Typography variant="h6" component="h6">
            Blood Donors
          </Typography>
        </Grid>
        <Grid item pb={2} xs={12} sm={12} md={6} lg={3} textAlign="center">
          <Typography variant="h3" component="h6">
            120+
          </Typography>
          <Typography variant="h6" component="h6">
            Happy Patients
          </Typography>
        </Grid>
        <Grid item pb={2} xs={12} sm={12} md={6} lg={3} textAlign="center">
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
