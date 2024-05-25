"use client";
import { useGetAllOfferedMeRequestQuery } from "@/redux/api/requestApi";
import { Box, CircularProgress, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const BloodRequestMe = () => {
  const { data, isLoading } = useGetAllOfferedMeRequestQuery({});
  console.log(data);
  const columns: GridColDef[] = [
    { field: "requesterName", headerName: "Name", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    // { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    // { field: "availability", headerName: "Availability", flex: 1 },
    // {
    //   field: "action",
    //   headerName: "Request",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: ({ row }) => {
    //     return (
    //       <IconButton>
    //         <BloodtypeIcon
    //           style={{ color: "primary.main" }}
    //           onClick={() => handleClick(row.id)}
    //         ></BloodtypeIcon>
    //         <BloodRequestModal
    //           open={isModalOpen}
    //           setOpen={setIsModalOpen}
    //           id={id}
    //         ></BloodRequestModal>
    //       </IconButton>
    //     );
    //   },
    // },
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField size="small" placeholder="Search Specialist"></TextField>
      </Stack>
      {!isLoading ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={data?.requestMe} columns={columns} hideFooter />
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
