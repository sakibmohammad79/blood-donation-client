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
import { Box, Typography } from "@mui/material";
import {
  useAllApprovedBloodRequestQuery,
  useAllBloodRequestQuery,
  useGetAllMyBloodRequestQuery,
  useGetAllOfferedMeRequestQuery,
} from "@/redux/api/requestApi";
const DonorDashboardPage = () => {
  const { data: donors } = useGetAllDonorsQuery({});
  const allDonor = [{ name: "Total Donors", value: donors?.meta?.total || 0 }];

  const { data: request } = useAllBloodRequestQuery({});

  const { data: approved } = useAllApprovedBloodRequestQuery({});
  const requestApprovedData = [
    { name: "Total Blood Requests", value: request?.meta?.total || 0 },
    { name: "Total Approved Requests", value: approved?.length || 0 },
  ];

  const { data: offeredRequests } = useGetAllOfferedMeRequestQuery({});
  const { data: myRequests } = useGetAllMyBloodRequestQuery({});
  const data = [
    { name: "Offered Requests", value: offeredRequests?.length || 0 },
    { name: "My Requests", value: myRequests?.myRequest?.length || 0 },
  ];

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Typography
          textAlign="center"
          sx={{ fontSize: { xs: 20, sm: 20, md: 24, lg: 30 } }}
          fontWeight={600}
          py={2}
        >
          MY REQUEST AND OFFER ME REQUEST
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis
              allowDecimals={false} // Disables decimal ticks on Y-axis
              tickCount={Math.max(...data.map((d) => d.value)) + 1} // Sets tick count based on the max value
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Typography
          textAlign="center"
          sx={{ fontSize: { xs: 20, sm: 20, md: 24, lg: 30 } }}
          fontWeight={600}
          py={2}
        >
          ALL DONORS
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={allDonor}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
        <Typography
          textAlign="center"
          sx={{ fontSize: { xs: 20, sm: 20, md: 24, lg: 30 } }}
          fontWeight={600}
          py={2}
        >
          TOTAL REQUST AND APPROVED REQUEST
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={requestApprovedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default DonorDashboardPage;
