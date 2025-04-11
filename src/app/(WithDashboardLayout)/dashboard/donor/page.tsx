"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Paper from "@mui/material/Paper";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  useAllApprovedBloodRequestQuery,
  useAllBloodRequestQuery,
  useGetAllMyBloodRequestQuery,
  useGetAllOfferedMeRequestQuery,
} from "@/redux/api/requestApi";

const DonorDashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: donors } = useGetAllDonorsQuery({});
  const { data: request } = useAllBloodRequestQuery({});
  const { data: approved } = useAllApprovedBloodRequestQuery({});
  const { data: offeredRequests } = useGetAllOfferedMeRequestQuery({});
  const { data: myRequests } = useGetAllMyBloodRequestQuery({});

  const totalDonors = donors?.meta?.total || 0;
  const totalRequests = request?.meta?.total || 0;
  const totalApproved = approved?.length || 0;
  const offeredMe = offeredRequests?.length || 0;
  const myReq = myRequests?.myRequest?.length || 0;

  const dataRequestSummary = [
    { name: "My Requests", value: myReq },
    { name: "Requests Offered to Me", value: offeredMe },
  ];

  const dataRequestApproved = [
    { name: "Total Requests", value: totalRequests },
    { name: "Approved Requests", value: totalApproved },
  ];

  const donorData = [{ name: "Total Donors", value: totalDonors }];

  const chartHeight = isMobile ? 250 : 350;

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: "#f1f1f1" }}>
            <CardContent>
              <Typography fontWeight={600}>Donors</Typography>
              <Typography variant="h5">{totalDonors}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: "#f1f1f1" }}>
            <CardContent>
              <Typography fontWeight={600}>Requests</Typography>
              <Typography variant="h5">{totalRequests}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: "#f1f1f1" }}>
            <CardContent>
              <Typography fontWeight={600}>Approved</Typography>
              <Typography variant="h5">{totalApproved}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ bgcolor: "#f1f1f1" }}>
            <CardContent>
              <Typography fontWeight={600}>Offered Me</Typography>
              <Typography variant="h5">{offeredMe}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart 1 */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography
          textAlign="center"
          fontWeight={600}
          sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }}
          pb={2}
        >
          My Requests & Offered Requests
        </Typography>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={dataRequestSummary}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Chart 2 */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography
          textAlign="center"
          fontWeight={600}
          sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }}
          pb={2}
        >
          All Donors
        </Typography>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={donorData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Chart 3 */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography
          textAlign="center"
          fontWeight={600}
          sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }}
          pb={2}
        >
          Total & Approved Blood Requests
        </Typography>
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={dataRequestApproved}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default DonorDashboardPage;
