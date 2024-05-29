"use client";
import {
  useGetAllOfferedMeRequestQuery,
  useOfferedMeRequestUpdateMutation,
} from "@/redux/api/requestApi";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const allowedStatuses = ["APPROVED", "REJECTED", "PENDING"];

const BloodRequestMe = () => {
  const { data: offeredRequest, isLoading } = useGetAllOfferedMeRequestQuery(
    {}
  );

  const [offeredMeRequestUpdate] = useOfferedMeRequestUpdateMutation();

  const handleStatusChange = async (id: string, value: string) => {
    await offeredMeRequestUpdate({ id, value });
  };

  const rows =
    Array.isArray(offeredRequest) && offeredRequest.length > 0
      ? offeredRequest.map((requestMe: any) => {
          const status = allowedStatuses.includes(requestMe.status)
            ? requestMe.status
            : "PENDING";

          return {
            ...requestMe,
            status,
            contactNumber: requestMe.contactNumber || "N/A",
            location: requestMe.location || "N/A",
            hospitalName: requestMe.hospitalName || "N/A",
          };
        })
      : [];

  const columns: GridColDef[] = [
    {
      field: "requesterName",
      headerName: "Requester Name",
      flex: 1,
    },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Select
          sx={{ width: "150px" }}
          value={params.row.status}
          onChange={(event) =>
            handleStatusChange(params.row.requesterId, event.target.value)
          }
        >
          {allowedStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "userInfo",
      headerName: "User Info",
      flex: 2,
      renderCell: (params) =>
        params.row.status === "APPROVED" ? (
          <>
            <Typography variant="body2">
              Contact: {params.row.contactNumber}
            </Typography>
            <Typography variant="body2" mx={2}>
              Hospital: {params.row.hospitalName}
            </Typography>
            <Typography variant="body2">
              Location: {params.row.location}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">N/A</Typography>
        ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField size="small" placeholder="Search Specialist"></TextField>
      </Stack>
      {!isLoading ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default BloodRequestMe;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMGFhYzI3ZC02NmU5LTRkODItOWMxNS1iZWU0NGIzODY2YjEiLCJlbWFpbCI6InRheXViQGdtYWlsLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTcxNjcxNjIwMiwiZXhwIjoxNzE3MTQ4MjAyfQ.eUB4bYu6GKdd1BYk6GIWN2UqQVQ9ZkrOhD6IlQJmIL0 post

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYmQ5YTE0ZC1jZjc1LTRiNmUtYjQ3My0wMGFkNWI4ODNiMWIiLCJlbWFpbCI6InRheXViQGdtYWlsLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTcxNjU3NzE2NiwiZXhwIjoxNzE3MDA5MTY2fQ.nKg5btOtto7ByPyFXgYkwM813-x7Y-rt3sPKGaQIvtg

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYTljOTVhYi03MDYzLTRlZjctYWJkNi1hNjgzMjAxYzdiZDQiLCJlbWFpbCI6InNhbWlAZ21haWwuY29tIiwicm9sZSI6IkRPTk9SIiwiaWF0IjoxNzE2NzE3MDY4LCJleHAiOjE3MTcxNDkwNjh9.rk90PncHmY9vj3q9_V0_jW05d5XGfqEoVCSlxcuKNpw

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYTljOTVhYi03MDYzLTRlZjctYWJkNi1hNjgzMjAxYzdiZDQiLCJlbWFpbCI6InNhbWlAZ21haWwuY29tIiwicm9sZSI6IkRPTk9SIiwiaWF0IjoxNzE2NzA5OTQxLCJleHAiOjE3MTcxNDE5NDF9.zc6BCvYkzjaSgpWffDIeMzlDYIhWU5hTCAgq_laCe2w
