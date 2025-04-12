"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import Paper from "@mui/material/Paper";
import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";

import {
  useAllApprovedBloodRequestQuery,
  useAllBloodRequestQuery,
} from "@/redux/api/requestApi";
import { useGetAllVolunteerQuery } from "@/redux/api/volunteerApi";

const DashboardPage = () => {
  const { data: donors } = useGetAllDonorsQuery({});
  const { data: volunteers } = useGetAllVolunteerQuery({});
  const { data: request } = useAllBloodRequestQuery({});
  const { data: approved } = useAllApprovedBloodRequestQuery({});
console.log( approved);

  const allDonor = [{ name: "Total Donors", value: donors?.meta?.total || 0 }];
  const allVolunteer = [{ name: "Total Volunteers", value: volunteers?.meta?.total || 0 }];

  const requestApprovedData = [
    { name: "Total Requests", value: request?.meta?.total || 0 },
    { name: "Approved Requests", value: approved?.length || 0 },
  ];

  const latestRequests = request?.data?.slice(0, 5); // show latest 5

  return (
    <Box p={2}>
      <Typography
        textAlign="center"
        fontWeight={700}
        sx={{ fontSize: { xs: 24, md: 30, lg: 36 }, mb: 4 }}
      >
        🩸 Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Total Donors */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3 }}>
            <Typography textAlign="center" fontWeight={600} mb={2}>
              👤 Total Donors
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={allDonor}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Total Volunteers */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3 }}>
            <Typography textAlign="center" fontWeight={600} mb={2}>
              🤝 Total Volunteers
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={allVolunteer}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Request vs Approved */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3 }}>
            <Typography textAlign="center" fontWeight={600} mb={2}>
              📄 Request vs Approved
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={requestApprovedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Latest Blood Requests Table */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              📝 Latest Blood Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Requester</TableCell>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>District</TableCell>
                    <TableCell>Hospital</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestRequests?.map((req: any) => (
                    <TableRow key={req.id}>
                      <TableCell>{req?.requesterName || "N/A"}</TableCell>
                      <TableCell>{req?.bloodType || "N/A"}</TableCell>
                      <TableCell>{req?.status || "Pending"}</TableCell>
                      <TableCell>{req?.location || "Unknown"}</TableCell>
                      <TableCell>{req?.hospitalName || "Unknown"}</TableCell>
                    </TableRow>
                  ))}
                  {!latestRequests?.length && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No recent blood requests found.
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

export default DashboardPage;
