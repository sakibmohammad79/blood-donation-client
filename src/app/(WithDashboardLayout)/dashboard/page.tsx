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
} from "@/redux/api/requestApi";
const DashboardPage = () => {
  const { data: donors } = useGetAllDonorsQuery({});
  const allDonor = [{ name: "Total Donors", value: donors?.meta?.total || 0 }];

  const { data: request } = useAllBloodRequestQuery({});

  const { data: approved } = useAllApprovedBloodRequestQuery({});
  const requestApprovedData = [
    { name: "Total Blood Requests", value: request?.meta?.total || 0 },
    { name: "Total Approved Requests", value: approved?.length || 0 },
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

export default DashboardPage;
