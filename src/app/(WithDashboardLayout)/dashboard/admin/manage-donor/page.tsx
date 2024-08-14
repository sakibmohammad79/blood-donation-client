"use client";
import {
  useDeleteDonorMutation,
  useDonorStatusUpdateMutation,
  useGetAllDonorsQuery,
} from "@/redux/api/donorApi";
import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DonorUpdateModal from "../../donor/profile/components/DonorUpdateModal";
import { toast } from "sonner";

const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageDonor = () => {
  const [isModalOpen, SetIsModalOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const { data: donors, isLoading, isError } = useGetAllDonorsQuery({});
  const [donorStatusUpdate] = useDonorStatusUpdateMutation();

  const handleStatusChange = async (id: string, value: string) => {
    await donorStatusUpdate({ id, value });
  };

  const [deleteDonor] = useDeleteDonorMutation();

  const handleDonorDelete = async (id: string) => {
    try {
      const res = await deleteDonor(id).unwrap();
      if (res?.id) {
        toast.success("Donor deleted successfully!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  if (donors?.donor?.length < 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={2}>
        No donors available.
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading donors. Please try again later.
      </Typography>
    );
  }

  const rows =
    donors?.donor.map((donor: any) => {
      const status = allowedStatuses.includes(donor.user.status)
        ? donor.user.status
        : "ACTIVE";
      return {
        ...donor,
        status,
      };
    }) || [];

  const handleGetIdAndModalOpen = (id: string) => {
    setId(id);
    SetIsModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "bloodType", headerName: "Blood Type", width: 150 },
    { field: "location", headerName: "Location" },
    { field: "contactNumber", headerName: "Contact Number", width: 150 },
    { field: "availability", headerName: "Availability", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
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
      width: 150,
      renderCell: ({ row }) => (
        <Box>
          <IconButton>
            <EditIcon
              fontSize="medium"
              style={{ color: "green" }}
              onClick={() => handleGetIdAndModalOpen(row?.id)}
            ></EditIcon>
            <DonorUpdateModal
              id={id}
              open={isModalOpen}
              setOpen={SetIsModalOpen}
            ></DonorUpdateModal>
          </IconButton>
          <IconButton>
            <DeleteIcon
              onClick={() => handleDonorDelete(row.id)}
              style={{ color: "red" }}
              fontSize="medium"
            ></DeleteIcon>
          </IconButton>
        </Box>
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
          Error loading donors. Please try again later.
        </Typography>
      ) : rows?.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No donors available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageDonor;
