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
  const {
    data: offeredRequest,
    isLoading,
    isError,
  } = useGetAllOfferedMeRequestQuery({});

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
    { field: "bloodNeedDetails", headerName: "Need Details", flex: 1 },
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
      flex: 4,
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
      {isLoading ? (
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
      ) : isError ? (
        <Typography variant="h6" color="error" textAlign="center" mt={2}>
          Error loading recieved request. Please try again later.
        </Typography>
      ) : rows.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No request available.
        </Typography>
      )}
    </Box>
  );
};

export default BloodRequestMe;
