"use client";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useAdminStatusUpdateMutation,
  useGetAllAdminQuery,
} from "@/redux/api/adminApi";

const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageAdmin = () => {
  const { data: admins, isLoading } = useGetAllAdminQuery({});

  const [adminStatusUpdate] = useAdminStatusUpdateMutation();

  const handleStatusChange = async (id: string, value: string) => {
    await adminStatusUpdate({ id, value });
  };

  const rows =
    admins?.admin.map((admin: any) => {
      const status = allowedStatuses.includes(admin.user.status)
        ? admin.user.status
        : "ACTIVE";
      return {
        ...admin,
        status,
      };
    }) || [];

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Select
          sx={{ width: "150px" }}
          value={params.row.status}
          onChange={(event) =>
            handleStatusChange(params.row.id, event.target.value)
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

export default ManageAdmin;
