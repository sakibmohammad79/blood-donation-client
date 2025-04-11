"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Paper from "@mui/material/Paper";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {
  useAllApprovedBloodRequestQuery,
  useAllBloodRequestQuery,
} from "@/redux/api/requestApi";
import { useGetAllAdminQuery } from "@/redux/api/adminApi";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const AdminDashboardPage = () => {
  const { data: donors } = useGetAllDonorsQuery({});
  const { data: admins } = useGetAllAdminQuery({});
  const { data: request } = useAllBloodRequestQuery({});
  const { data: approved } = useAllApprovedBloodRequestQuery({});

  const donorAdminData = [
    { name: "Total Admins", value: admins?.meta?.total || 0 },
    { name: "Total Donors", value: donors?.meta?.total || 0 },
  ];

  const requestApprovedData = [
    { name: "Total Blood Requests", value: request?.meta?.total || 0 },
    { name: "Total Approved Requests", value: approved?.length || 0 },
  ];

  const recentRequests = request?.data?.slice(0, 5) || [];

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
        Admin Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Chart 1: Admin vs Donor */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6" textAlign="center" fontWeight={500} mb={2}>
              Total Admins & Donors
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={donorAdminData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {donorAdminData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Chart 2: Blood Request Overview */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6" textAlign="center" fontWeight={500} mb={2}>
              Blood Request & Approved
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestApprovedData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Table: Recent Requests */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={500} textAlign="center" mb={2}>
              Recent Blood Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Requester</TableCell>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>District</TableCell>
                    <TableCell>Hospital</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentRequests.map((req: any, i: number) => (
                    <TableRow key={req.id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{req?.requesterName || "N/A"}</TableCell>
                      <TableCell>{req?.bloodType || "Unkown"}</TableCell>
                      <TableCell>{req?.status || "Pending"}</TableCell>
                      <TableCell>{req?.location || "Unkown"}</TableCell>
                      <TableCell>{req?.Hospital || "Unknown"}</TableCell>
                    </TableRow>
                  ))}
                  {recentRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No recent requests found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardPage;
