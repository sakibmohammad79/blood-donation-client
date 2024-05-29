"use client";

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
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/api/adminApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminUPdateModal from "../profile/components/AdminUpdateModal";
import { toast } from "sonner";

const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageAdmin = () => {
  const [isModalOpen, SetIsModalOpen] = React.useState(false);

  const { data: admins, isLoading } = useGetAllAdminQuery({});
  const [adminStatusUpdate] = useAdminStatusUpdateMutation();

  const handleStatusChange = async (id: string, value: string) => {
    await adminStatusUpdate({ id, value });
  };

  const [deleteAdmin] = useDeleteAdminMutation();

  const handleAdminDelete = async (id: string) => {
    const res = await deleteAdmin(id).unwrap();

    if (res?.id) {
      toast.success("Admin deleted successfully!");
    }
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
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
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
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <IconButton onClick={() => SetIsModalOpen(true)}>
            <EditIcon></EditIcon>
            <AdminUPdateModal
              id={row.id}
              open={isModalOpen}
              setOpen={SetIsModalOpen}
            ></AdminUPdateModal>
          </IconButton>
          <IconButton onClick={() => handleAdminDelete(row.id)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Box>
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
